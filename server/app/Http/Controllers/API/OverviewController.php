<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOverviewRequest;
use App\Http\Requests\UpdateOverviewRequest;
use App\Services\OverviewService;
use Illuminate\Http\Request;

class OverviewController extends Controller
{

    public function __construct(public OverviewService $overviewService)
    {
        $this->overviewService = $overviewService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        return $this->overviewService->getOverviewList();

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOverviewRequest $request, )
    {
        return $this->overviewService->storeOverview($request->validated());

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->overviewService->getOverview($id);
    }


    //show service overview by array of id
    public function showServiceOverviewByArrayId(Request $request)
    {
        $request->validate([
            'overview_ids' => 'required',
        ]);
        $overview_ids = $request->get('overview_ids');
        return $this->overviewService->getServiceOverviewByArrayId($overview_ids);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, UpdateOverviewRequest $request)
    {
        return $this->overviewService->updateOverview($id, $request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, )
    {
        return $this->overviewService->deleteOverview($id);
    }
}
