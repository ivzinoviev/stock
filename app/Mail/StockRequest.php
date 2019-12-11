<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class StockRequest extends Mailable
{
    use Queueable, SerializesModels;

    public $company;

    public $start;

    public $end;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($company, $start, $end)
    {
        $this->company = $company;
        $this->start = $start;
        $this->end = $end;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->view('emails.stockRequest')
            ->subject($this->company);
    }
}
