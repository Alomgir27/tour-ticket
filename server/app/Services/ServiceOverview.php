<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\ServiceOverview as ModelsServiceOverview;

class ServiceOverview
{
    public $apiResponses; 

    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }

    public function storeServiceOverview($serviceOverviewData)
    {
        try {
            // Create the service overview
            $storeOverview = ModelsServiceOverview::create([
                'service_id' => $serviceOverviewData['service_id'],
                'service_overviews' => json_encode($serviceOverviewData['service_overviews']),
            ]);
            
            return $this->apiResponses->sendResponse($storeOverview, 'Service Overview created successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError('An error occurred while processing the request');
        }

    }

    public function updateServiceOverview($serviceOverviewId, $updatedData)
    {
        try {
            // Find the service overview by ID
            $serviceOverview = ModelsServiceOverview::find($serviceOverviewId);

            // Check if the record exists
            if (!$serviceOverview) {

                return $this->apiResponses->sendError('Service Overview not found');
                }

            // Update the service overview
            $serviceOverview->update([
                'service_id' => $updatedData['service_id'],
                'service_overviews' => json_encode($updatedData['service_overviews']),
            ]);

            return $this->apiResponses->sendResponse($serviceOverview, 'Service Overview updated successfully');
        } catch (\Throwable $th) {
            return ['status' => 'error', 'message' => 'An error occurred while processing the request'];
        }

    }


    public function getServiceOverview($serviceOverviewId)
    {
        try {
            // Find the Overview record by ID
            $serviceOverview = ModelsServiceOverview::find($serviceOverviewId);

            // Check if the record exists
            if (!$serviceOverview) {
                return $this->apiResponses->sendError('Service Overview not found');
            }

            // Return the overview data
            return $this->apiResponses->sendResponse($serviceOverview, 'Service Overview retrieved successfully');

        } catch (\Throwable $th) {
            return $this->apiResponses->sendError('An error occurred while processing the request');        }
    }

  
}
