<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store; // Make sure to import the Store model

class StoreController extends Controller
{
    // Get a list of stores
    public function index()
    {
        $stores = Store::all();
        return response()->json(['data' => $stores]);
    }

    // Create a new store
    public function store(Request $request)
    {
        $store = Store::create($request->all());
        return response()->json(['data' => $store], 201); // Return the newly created store with a 201 status code.
    }

    // Retrieve the specified store
    public function show($id)
    {
        $store = Store::find($id);
        if (!$store) {
            return response()->json(['message' => 'Store not found'], 404);
        }
        return response()->json(['data' => $store]);
    }

    // Update the specified store
    public function update(Request $request, $id)
    {
        $store = Store::find($id);
        if (!$store) {
            return response()->json(['message' => 'Store not found'], 404);
        }
        $store->update($request->all());
        return response()->json(['data' => $store]);
    }

    // Delete the specified store
    public function destroy($id)
    {
        $store = Store::find($id);
        if (!$store) {
            return response()->json(['message' => 'Store not found'], 404);
        }
        $store->delete();
        return response()->json(['message' => 'Store deleted'], 204); // Return a 204 status code for a successful deletion.
    }
}
