<?php

namespace App\Http\Controllers;

use App\Mail\StockRequest;
use App\Rules\CompanyInList;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;


class ApiController extends Controller
{
    public function submit(Request $request) {
        $dateFormat = config('app.input_date_format');

        $validatedData = $request->validate([
            'company' => ['required', 'string', new CompanyInList],
            'start' => "required|date_format:{$dateFormat}|before:today",
            'end' => "required|date_format:{$dateFormat}|after:start|before:today",
            'email' => 'required|email',
        ]);

        $stockData = $this->getStockData($validatedData);
//        $stockData = $this->parseCsv( Storage::disk('local')->get('WIKI-AAPL.csv'));

        if (!$stockData) {
            return response([
                'errors' => [
                    'end' => ['Data for selected period not found']
                ]
            ], 404);
        }

        Mail::to($validatedData['email'])->queue(
            new StockRequest(
                $validatedData['company'],
                $validatedData['start'],
                $validatedData['end']
            )
        );

        return response([
            'company' => strtoupper($validatedData['company']),
            'range' => $validatedData['start'] . '-' . $validatedData['end'],
            'quotes' => $this->prepareQuotes($stockData),
            'charts' => $this->prepareCharts(
                $stockData,
                'Date',
                ['Open', 'Close']
            )
        ]);
    }

    protected function prepareCharts($data, $commonAxis, $chartValues) {
        $values = array_map(function($item) use ($data, $commonAxis, $chartValues) {
            return array_merge(
                [$item[$commonAxis]],
                array_map(function($chartVal) use ($data, $item) {
                    return (float)$item[$chartVal];
                }, $chartValues)
            );
        }, $data);

        $chartKeys = [array_merge([$commonAxis], $chartValues)];

        return array_merge(
            $chartKeys,
            $values
        );
    }

    protected function prepareQuotes($items) {
        return array_map(function($item) {
            return  Arr::only($item, [
                'Date',
                'Open',
                'High',
                'Low',
                'Close',
                'Volume'
            ]);
        }, $items);
    }

    protected function getStockData($params) {
        $client = new Client();

        $res = $client->get(
            preg_replace(
                [
                    '/:symbol/',
                    '/:start_date/',
                    '/:end_date/'
                ],
                [
                    strtoupper($params['company']),
                    $params['start'],
                    $params['end'],
                ],
                config('services.stock_data_source')
            )
        );


        if ($res->getStatusCode() !== 200) {
            return false;
        }

        return $this->parseCsv($res->getBody());
    }

    protected function parseCsv($csv) {
        $rows = str_getcsv($csv, "\n");

        foreach($rows as &$row) {
            $row = str_getcsv($row, ",");
        }

        array_walk($rows, function(&$a) use ($rows) {
            $a = array_combine($rows[0], $a);
        });
        array_shift($rows);
        return $rows;
    }
}
