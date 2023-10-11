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

    // [2023-10-11 15:20:12] local.INFO: array (
    //     'search' => 'Hindi',
    //     'category' => 'Harry Potter Tours',
    //     'startDate' => '2023-10-10T18:00:00.000Z',
    //     'endDate' => NULL,
    //     'sort' => NULL,
    //     'startHour' => NULL,
    //     'endHour' => NULL,
    //     'lowerPrice' => NULL,
    //     'higherPrice' => NULL,
    //     'page' => '1',
    //   )  
      

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $sort = $request->input('sort');
        $startHour = $request->input('startHour');
        $endHour = $request->input('endHour');
        $lowerPrice = $request->input('lowerPrice');
        $higherPrice = $request->input('higherPrice');
        $page = $request->input('page');

        return $this->service->getServiceList($search, $category, $startDate, $endDate, $sort, $startHour, $endHour, $lowerPrice, $higherPrice, $page);

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
