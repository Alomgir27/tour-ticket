<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PurchaseHistory;
use Illuminate\Http\Request;

class PurchaseHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $getPurchaseHistory = PurchaseHistory::where('user_id', $id)->get();

        return response()->json([
            'status' => 'success',
            'data' => $getPurchaseHistory
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
