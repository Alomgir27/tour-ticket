<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Services\ServicesService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct(public ServicesService $service)
    {
        $this->service = $service;
    }


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $paginate = $request->get('paginate', 20);
        return $this->service->getServiceList($paginate);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request,)
    {

        return $this->service->storeService($request->validated());

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id,)
    {
        return $this->service->getService($id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id,Request $updateRequest,)
    {
        return $this->service->updateService($id, $updateRequest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->service->deleteService($id);
    }
}
