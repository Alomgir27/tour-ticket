<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\Favourite;

class FavouriteService
{
    public $apiResponses;

    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }
    
    public function storeFavourite($favouriteData)
    {
        try {
            // Create the Favourite
            $storeFavourite = Favourite::create($favouriteData);

            return $this->apiResponses->sendResponse($storeFavourite, 'Favourite created successfully');

        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function updateFavourite($FavouriteId, $updatedData)
{
    try {
        // Find the Favourite by ID
        $Favourite = Favourite::find($FavouriteId);

        // Check if the record exists
        if (!$Favourite) {
            return $this->apiResponses->sendError('Favourite not found', [], 404);
        }

        // Update the Favourite
        $Favourite->update($updatedData);

        return $this->apiResponses->sendResponse($Favourite, 'Favourite updated successfully');
    } catch (\Throwable $th) {
        return $this->apiResponses->sendError($th->getMessage(), [], 500);
    }
    }


    public function getFavourite($FavouriteId)
    {
        try {
            // Find the Favourite by ID
            $Favourite = Favourite::find($FavouriteId);

            // Check if the Favourite exists
            if (!$Favourite) {
                return $this->apiResponses->sendError('Favourite not found', [], 404);
            }

            return $this->apiResponses->sendResponse($Favourite, 'Favourite retrieved successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }

    }

    public function deleteFavourite($FavouriteId) {
        try {
            // Find the Favourite by ID
            $Favourite = Favourite::find($FavouriteId);

            // Check if the Favourite exists
            if (!$Favourite) {
                return $this->apiResponses->sendError('Favourite not found', [], 404);
            }

            // Delete the Favourite
            $Favourite->delete();

            return $this->apiResponses->sendResponse([], 'Favourite deleted successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

}
