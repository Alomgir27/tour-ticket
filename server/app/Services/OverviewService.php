<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\Overview;

class OverviewService
{
    public $apiResponses;

    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }

    public function getOverviewList()
    {
        $getOverviewList = Overview::get();

        return $this->apiResponses->sendResponse($getOverviewList, 'Overview list retrieved successfully');
    }

    public function storeOverview($overviewData)
    {
        try {

            $storeOverview = Overview::create([
                'title' => $overviewData['title'],
                'description' => $overviewData['description']
            ]);

            return $this->apiResponses->sendResponse($storeOverview, 'Overview created successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function updateOverview($overviewId, $updatedData)
    {
        try {
            // Find the Overview record by ID
            $overview = Overview::find($overviewId);
            // Check if the record exists
            if (!$overview) {
                return $this->apiResponses->sendError('Overview not found', [], 404);
            }

            // Update the record with the new data
            $overview->update([
                'title' => $updatedData['title'] ?? $overview->title,
                'description' => $updatedData['description'] ?? $overview->description
            ]);

            // Optionally, you can return the updated record as well
            return $this->apiResponses->sendResponse($overview, 'Overview updated successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }


    public function getOverview($overviewId)
    {
        try {
            // Find the Overview record by ID
            $overview = Overview::find($overviewId);

            // Check if the record exists
            if (!$overview) {
                return $this->apiResponses->sendError('Overview not found', [], 404);
            }

            // Return the overview data
            return $this->apiResponses->sendResponse($overview, 'Overview retrieved successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function getServiceOverviewByArrayId($serviceOverviewIds)
{
    try {
        
       // Find the Overview records by the array of IDs
        $overviews = Overview::whereIn('id', json_decode($serviceOverviewIds))->get();

        // Check if any records were found
        if ($overviews->isEmpty()) {
            return $this->apiResponses->sendError('No overviews found', [], 404);
        }

        // Return the overview data
        return $this->apiResponses->sendResponse($overviews, 'Overviews retrieved successfully');
    } catch (\Throwable $th) {
        return $this->apiResponses->sendError($th->getMessage(), [], 500);
    }
}



    public function deleteOverview($id)
    {
        try {
            $Overview = Overview::findOrFail($id);

            $deleted = $Overview->delete();

            if ($deleted) {
                return $this->apiResponses->sendResponse([], 'Overview deleted successfully');
            }

            return $this->apiResponses->sendError('Overview could not be deleted', [], 500);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->apiResponses->sendError('Overview not found', [], 404);
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError('An error occurred while processing the request', [], 500);
        }
    }
}
