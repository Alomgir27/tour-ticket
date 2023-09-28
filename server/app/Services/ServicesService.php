<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\Service;
use App\Models\ServiceDetailImage;
use App\Models\ServiceDetailPackage;
use App\Models\ServiceExperiance;
use App\Models\ServiceOverview;
use App\Models\ServiceWhatIncluded;
use Illuminate\Support\Facades\DB;

class ServicesService
{

    public $apiResponses;

    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }

    public function getServiceList($paginate)
    {
        $getServiceList = Service::paginate($paginate);

        return $this->apiResponses->sendResponse($getServiceList, 'Service list retrieved successfully');
    }

    public function storeService($serviceData)
    {
        try {
            return DB::transaction(function () use ($serviceData) {
                // Upload and save the main service image
                $imageName = null;
                if (isset($serviceData['images'])) {
                    $image = $serviceData['images'];
                    $imageName = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('assets/services/thumb/'), $imageName);
                }
    
                // Calculate the discount amount
                $discountAmount = $serviceData['price'] * ($serviceData['discount'] / 100);
                $discountedPrice = $serviceData['price'] - $discountAmount;
    
                // Create the main service entry
                $service = Service::create([
                    'title' => $serviceData['title'],
                    'tags' => $serviceData['tags'],
                    'price' => $serviceData['price'],
                    'short_description' => $serviceData['short_description'],
                    'discount' => $serviceData['discount'],
                    'actual_price' => $discountedPrice,
                    'images' => $imageName,
                    'activity_feature' => $serviceData['activity_feature'],
                ]);
    
                // Store service detail images
                if (isset($serviceData['detail_images'])) {
                    foreach ($serviceData['detail_images'] as $detailImage) {
                        $detailImageName = time() . '_' . $detailImage->getClientOriginalName();
                        $detailImage->move(public_path('assets/services/detail/'), $detailImageName);
    
                        ServiceDetailImage::create([
                            'service_id' => $service->id,
                            'service_image' => $detailImageName,
                        ]);
                    }
                }
    
                // Store other related data within the transaction
                ServiceDetailPackage::create([
                    'service_id' => $service->id,
                    'tour_date' => $serviceData['tour_date'],
                    'tour_type' => $serviceData['tour_type'],
                   'is_online' => $serviceData['is_online'] ?? '0',
                    'meeting_point' => $serviceData['meeting_point'],
                    'opening_hours' => $serviceData['starting_time'],
                    'ticket_details' => $serviceData['ticket_details'],
                ]);
    
                ServiceExperiance::create([
                    'service_id' => $service->id,
                    'full_description' => $serviceData['full_description'],
                    'highlights' => $serviceData['highlights'],
                    'important_information' => $serviceData['important_information'],
                ]);
    
                ServiceOverview::create([
                    'service_id' => $service->id,
                    'service_overviews' => $serviceData['service_overviews'],
                ]);
    
                ServiceWhatIncluded::create([
                    'service_id' => $service->id,
                    'service_includes' => $serviceData['service_includes'],
                ]);
    
                return $this->apiResponses->sendResponse(
                    $service, 'Service created successfully');
            });
    
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function updateService($id, $updatedServiceData)
    {
        try {
            return DB::transaction(function () use ($id, $updatedServiceData) {
                $service = Service::findOrFail($id);
    
                // Update the main service data
                $service->update([
                    'title' => $updatedServiceData['title'],
                    'tags' => $updatedServiceData['tags'],
                    'price' => $updatedServiceData['price'],
                    'short_description' => $updatedServiceData['short_description'],
                    'discount' => $updatedServiceData['discount'],
                    'actual_price' => $updatedServiceData['price'] * (1 - $updatedServiceData['discount'] / 100),
                    'activity_feature' => $updatedServiceData['activity_feature'],
                ]);
    
                // Update or delete existing detail images and store new ones
                if (isset($updatedServiceData['detail_images'])) {
                    $detailImages = $updatedServiceData['detail_images'];
    
                    // Delete existing detail images not present in the update
                    $existingDetailImages = $service->detailImages->pluck('id')->toArray();
                    $imagesToDelete = array_diff($existingDetailImages, array_keys($detailImages));
                    ServiceDetailImage::whereIn('id', $imagesToDelete)->delete();
    
                    // Store/update detail images
                    foreach ($detailImages as $imageId => $detailImage) {
                        $imageModel = ServiceDetailImage::findOrNew($imageId);
                        $imageName = time() . '_' . $detailImage->getClientOriginalName();
                        $detailImage->move(public_path('assets/services/detail/'), $imageName);
    
                        $imageModel->fill([
                            'service_id' => $id,
                            'service_image' => $imageName,
                        ])->save();
                    }
                }
    
                // Update other related data
                $serviceDetailPackage = ServiceDetailPackage::updateOrCreate(
                    ['service_id' => $id],
                    [
                        'tour_date' => $updatedServiceData['tour_date'],
                        'tour_type' => $updatedServiceData['tour_type'],
                        'meeting_point' => $updatedServiceData['meeting_point'],
                        'opening_hours' => $updatedServiceData['opening_hours'],
                        'ticket_details' => $updatedServiceData['ticket_details'],
                    ]
                );
    
                $serviceExperiance = ServiceExperiance::updateOrCreate(
                    ['service_id' => $id],
                    [
                        'full_description' => $updatedServiceData['full_description'],
                        'highlights' => $updatedServiceData['highlights'],
                        'important_information' => $updatedServiceData['important_information'],
                    ]
                );
    
                $serviceOverview = ServiceOverview::updateOrCreate(
                    ['service_id' => $id],
                    ['service_overviews' => $updatedServiceData['service_overviews']]
                );
    
                $serviceWhatIncluded = ServiceWhatIncluded::updateOrCreate(
                    ['service_id' => $id],
                    ['service_includes' => $updatedServiceData['service_includes']]
                );
    
                return $this->apiResponses->sendResponse($service, 'Service updated successfully');
            });
    
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }


    public function getService($id){
        try {
            $service = Service::with(['images','whatIncludes','serviceExp','serviceOverview'])->findOrFail($id);
            return $this->apiResponses->sendResponse($service, 'Service retrieved successfully');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->apiResponses->sendError('Service not found', [], 404);
        } catch (\Throwable $th) {
            // Handle any other unexpected errors here if needed.
            return $this->apiResponses->sendError('An error occurred while processing the request', [], 500);
        }
    }

    public function deleteService($id) {
        try {
            $service = Service::findOrFail($id);
            // Check if the image is available and delete it
            // public_path('assets/services/thumb/'), $imageName
            if ($service->images && file_exists(public_path('assets/services/thumb/'.$service->images))) {
                unlink(public_path('assets/services/thumb/'.$service->images));
            }

            $deleted = $service->delete();

            if ($deleted) {
                return $this->apiResponses->sendResponse([], 'Service deleted successfully');
            }

            return $this->apiResponses->sendError('Service could not be deleted', [], 500);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->apiResponses->sendError('Service not found', [], 404);
        } catch (\Throwable $th) {
            // Handle any other unexpected errors here if needed.
            return $this->apiResponses->sendError('An error occurred while processing the request', [], 500);
        }
    }

}
