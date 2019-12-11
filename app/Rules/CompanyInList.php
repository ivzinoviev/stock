<?php

namespace App\Rules;

use GuzzleHttp\Client;
use Illuminate\Contracts\Validation\Rule;

class CompanyInList implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $client = new Client();
        $res = $client->get(config('services.company_data_source'));

        if ($res->getStatusCode() !== 200) {
            return false;
        }

        $data = json_decode($res->getBody());

        foreach($data as $item) {
            if ($item->Symbol === strtoupper($value)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Company Symbol not found';
    }
}
