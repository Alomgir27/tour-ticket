<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\WhatInclude;

class WhatIncludeService
{
    public $apiResponses;

    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }

    public function getWhatIncludeList()
    {
        $getWhatIncludeList = WhatInclude::get();

        return $this->apiResponses->sendResponse($getWhatIncludeList, 'WhatInclude list retrieved successfully');

    }

    public function storeWhatInclude($data)
    {
        try {

            $storeWhatInclude = WhatInclude::create([
                'title' => $data['title'],
                'description' => $data['description']
            ]);

            return $this->apiResponses->sendResponse($storeWhatInclude, 'WhatInclude created successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }

    }

    public function updateWhatInclude($id, $updatedData)
    {
        try {
            // Find the WhatInclude record by ID
            $WhatInclude = WhatInclude::find($id);
// return $updatedData;
            // Check if the record exists
            if (!$WhatInclude) {
                return $this->apiResponses->sendError('WhatInclude not found', [], 404);
            }

            // Update the record with the new data
            $WhatInclude->update([
                'title' => $updatedData['title'],
                'description' => $updatedData['description']
            ]);

            // Optionally, you can return the updated record as well
            return $this->apiResponses->sendResponse($WhatInclude, 'WhatInclude updated successfully');


        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }


    public function getWhatInclude($id)
    {
        try {
            // Find the WhatInclude record by ID
            $WhatInclude = WhatInclude::find($id);

            // Check if the record exists
            if (!$WhatInclude) {
                return $this->apiResponses->sendError('WhatInclude not found', [], 404);
            }

            // Return the WhatInclude data
            return $this->apiResponses->sendResponse($WhatInclude, 'WhatInclude retrieved successfully');

        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function getWhatIncludesByArrayId($what_include_ids)
    {
        try {
            // Find the WhatInclude record by ID
            $WhatInclude = WhatInclude::whereIn('id', json_decode($what_include_ids))->get();

            // Check if the record exists
            if (!$WhatInclude) {
                return $this->apiResponses->sendError('WhatInclude not found', [], 404);
            }

            // Return the WhatInclude data
            return $this->apiResponses->sendResponse($WhatInclude, 'WhatInclude retrieved successfully');

        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function deleteWhatInclude($id) {
        try {
            $WhatInclude = WhatInclude::findOrFail($id);

            $deleted = $WhatInclude->delete();

            if ($deleted) {
                return $this->apiResponses->sendResponse([], 'WhatInclude deleted successfully');
            }

            return $this->apiResponses->sendError('WhatInclude could not be deleted', [], 500);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->apiResponses->sendError('WhatInclude not found', [], 404);
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError('An error occurred while processing the request', [], 500);
        }
    }

}
