<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceOverviewRequest;
use App\Http\Requests\UpdateServiceOverviewRequest;
use App\Services\ServiceOverview;
use Illuminate\Http\Request;

class ServiceOverviewController extends Controller
{
    public function __construct(public ServiceOverview $serviceOverview)
    {
        $this->serviceOverview = $serviceOverview;
    }
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
    public function store(StoreServiceOverviewRequest $request)
    {
        return $this->serviceOverview->storeServiceOverview($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->serviceOverview->getServiceOverview($id);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceOverviewRequest $request, string $id)
    {
        return $this->serviceOverview->updateServiceOverview($id, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
