<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Services\ServicesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    public function __construct(public ServicesService $service)
    {
        $this->service = $service;
    }

    // [2023-10-08 14:39:13] local.INFO: array (
    //     'page' => '1',
    //     'search' => NULL,
    //     'category' => NULL,
    //     'sort' => NULL,
    //     'price' => NULL,
    //     'tags' => NULL,
    //     'date' => NULL,
    //     'duration' => NULL,
    //   )  

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $search = $request->search ?? null;
        $category = $request->category ?? null;
        $sort = $request->sort ?? null;
        $price = $request->price ?? null;
        $tags = $request->tags ?? null;
        $date = $request->date ?? null;
        $duration = $request->duration ?? null;
        return $this->service->getServiceList($page, $search, $category, $sort, $price, $tags, $date, $duration);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
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
    public function update(Request $updateRequest, string $id)
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
