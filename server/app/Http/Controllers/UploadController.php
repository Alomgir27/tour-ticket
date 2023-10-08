<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'details' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'tag' => 'required|string',
            'short_desc' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        if ($request->file('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        // Handle other data (title, details, tag, short_desc) here
        
        return response()->json(['message' => 'File uploaded successfully']);
    }
}
