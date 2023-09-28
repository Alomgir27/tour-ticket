<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWhatIncludeRequest;
use App\Http\Requests\UpdateOverviewRequest;
use App\Services\WhatIncludeService;
use Illuminate\Http\Request;

class WhatIncludeController extends Controller
{

    public function __construct(public WhatIncludeService $whatIncludeService)
    {
        $this->whatIncludeService = $whatIncludeService;
    }
  
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return $this->whatIncludeService->getWhatIncludeList();

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWhatIncludeRequest $request )
    {
        return $this->whatIncludeService->storeWhatInclude($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, )
    {
        return $this->whatIncludeService->getWhatInclude($id);
    }

    public function showWhatIncludesByArrayId(Request $request)
    {
        $request->validate([
            'what_include_ids' => 'required',
        ]);
        $what_include_ids = $request->get('what_include_ids');
        return $this->whatIncludeService->getWhatIncludesByArrayId($what_include_ids);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, UpdateOverviewRequest $request)
    {
        return $this->whatIncludeService->updateWhatInclude($id, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, )
    {
        return $this->whatIncludeService->deleteWhatInclude($id);
    }
}
