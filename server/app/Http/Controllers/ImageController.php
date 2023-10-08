<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;


class ImageController extends Controller
{
    //in params string we will pass the image path by path parameter
    public function show(Request $request)
    {
        try {
            $src = $request->query('src');
            $file = public_path() . $src;
            return Response()->file($file);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }


}
