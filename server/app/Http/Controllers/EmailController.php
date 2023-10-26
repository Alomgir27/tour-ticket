<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use PDF;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $data = $request->all();
        Log::info($data);

        Mail::send([], [], function ($message) use ($data) {
            $message->to($data['to'], $data['recipientName'])
                ->subject($data['subject'])
                ->attach($data['attachments'][0]['path'], [
                    'as' => $data['attachments'][0]['filename'],
                    'mime' => $data['attachments'][0]['contentType'],
                ]);
        });

        return response()->json(['message' => 'Request completed']);
    }
}
