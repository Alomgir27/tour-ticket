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
use Illuminate\Support\Facades\Log;

class ServicesService
{

    public $apiResponses;

    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }

   
    public function getServiceList($page, $search, $sort, $price, $tags, $date, $duration)
    {
        $paginate = 20;

        $query = Service::query();

        // if($search){
        //     $query->where('title', 'LIKE', "%{$search}%");
        // }

       
        $serviceList = $query->paginate($paginate, ['*'], 'page', $page);

        //update the image path
        foreach ($serviceList as $service) {
            $service->images = '/assets/services/thumb/' . $service->images;
        }

        // //update the detail image path
        // foreach ($getServiceList as $service) {
        //     $serviceDetailImages = $service->detailImages;
        //     foreach ($serviceDetailImages as $serviceDetailImage) {
        //         $serviceDetailImage->service_image = '/assets/services/detail/' . $serviceDetailImage->service_image;
        //     }
        // }


        return $this->apiResponses->sendResponse($serviceList, 'Service list retrieved successfully');
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
    
            try {
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
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }

    
            try {
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
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }

            

                try {
                    ServiceDetailPackage::create([
                        'service_id' => $service->id,
                        'tour_date' => $serviceData['tour_date'],
                        'tour_type' => $serviceData['tour_type'],
                        'meeting_point' => $serviceData['meeting_point'],
                        'opening_hours' => $serviceData['opening_hours'],
                        'starting_time' => $serviceData['starting_time'],
                        'is_online' => $serviceData['is_online'] ?? '0', // '0' => 'No', '1' => 'Yes'
                        'ticket_details' => $serviceData['ticket_details'],
                    ]);
                } catch (\Throwable $th) {
                    Log::error($th->getMessage());
                }

                
    
            try{
                ServiceExperiance::create([
                    'service_id' => $service->id,
                    'full_description' => $serviceData['full_description'],
                    'highlights' => $serviceData['highlights'],
                    'important_information' => $serviceData['important_information'],
                ]);
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }

            try{
                ServiceOverview::create([
                    'service_id' => $service->id,
                    'service_overviews' => $serviceData['service_overviews'],
                ]);
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }

            try{
                ServiceWhatIncluded::create([
                    'service_id' => $service->id,
                    'service_includes' => $serviceData['service_includes'],
                ]);
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
    
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
    
            try {
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
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }


            try {
                // Update or delete existing detail images and store new ones
                if (isset($updatedServiceData['detail_images'])) {
                    $detailImages = $updatedServiceData['detail_images'];
            
                    // Delete detail images
                    $serviceDetailImages = ServiceDetailImage::where('service_id', $id)->get();
                    foreach ($serviceDetailImages as $serviceDetailImage) {
                        if (!array_key_exists($serviceDetailImage->id, $detailImages)) {
                            if ($serviceDetailImage->service_image && file_exists(public_path('assets/services/detail/'.$serviceDetailImage->service_image))) {
                                unlink(public_path('assets/services/detail/'.$serviceDetailImage->service_image));
                            }
                            $serviceDetailImage->delete();
                        }
                    }

                    // Store new detail images
                    foreach ($detailImages as $detailImage) {
                        if (!is_numeric($detailImage)) {
                            $detailImageName = time() . '_' . $detailImage->getClientOriginalName();
                            $detailImage->move(public_path('assets/services/detail/'), $detailImageName);
                
                            ServiceDetailImage::create([
                                'service_id' => $id,
                                'service_image' => $detailImageName,
                            ]);
                        }
                    }
            
                   
                }
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
            
            try {
                if (
                    isset($updatedServiceData['images']) &&
                    $updatedServiceData['images'] !== null &&
                    $updatedServiceData['images'] !== '' &&
                    $updatedServiceData['images'] !== 'undefined'
                ) {
                    $oldImage = $service->images;
            
                    // Check if the old image file exists before attempting to unlink it
                    if (file_exists(public_path('assets/services/thumb/' . $oldImage))) {
                        unlink(public_path('assets/services/thumb/' . $oldImage));
                    }
            
                    $image = $updatedServiceData['images'];
                    $imageName = time() . '_' . $image->getClientOriginalName();
                    $image->move(public_path('assets/services/thumb/'), $imageName);
                    $service->update([
                        'images' => $imageName,
                    ]);
                }
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
            

    
            try {
                // Update other related data
                $serviceDetailPackage = ServiceDetailPackage::updateOrCreate(
                    ['service_id' => $id],
                    [
                        'tour_date' => $updatedServiceData['tour_date'],
                        'tour_type' => $updatedServiceData['tour_type'],
                        'meeting_point' => $updatedServiceData['meeting_point'],
                        'opening_hours' => $updatedServiceData['opening_hours'],
                        'ticket_details' => $updatedServiceData['ticket_details'],
                        'starting_time' => $updatedServiceData['starting_time'],
                    ]
                );
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
    
            try {
                $serviceExperiance = ServiceExperiance::updateOrCreate(
                    ['service_id' => $id],
                    [
                        'full_description' => $updatedServiceData['full_description'],
                        'highlights' => $updatedServiceData['highlights'],
                        'important_information' => $updatedServiceData['important_information'],
                    ]
                );
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
    
            try {
                $serviceOverview = ServiceOverview::updateOrCreate(
                    ['service_id' => $id],
                    ['service_overviews' => $updatedServiceData['service_overviews']]
                );
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }

            try {
                $serviceWhatIncluded = ServiceWhatIncluded::updateOrCreate(
                    ['service_id' => $id],
                    ['service_includes' => $updatedServiceData['service_includes']]
                );
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
    
                return $this->apiResponses->sendResponse($service, 'Service updated successfully');
            });
    
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }


    public function getService($id){
        try {
            $service = Service::with(['images','whatIncludes','serviceExp','serviceOverview'])->findOrFail($id);
            $serviceDetailPackage = ServiceDetailPackage::where('service_id',$id)->first();
            $service->serviceDetailPackage = $serviceDetailPackage;
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
            try {
                $serviceDetailImages = $service->detailImages;
                foreach ($serviceDetailImages as $serviceDetailImage) {
                    if ($serviceDetailImage->service_image && file_exists(public_path('assets/services/detail/'.$serviceDetailImage->service_image))) {
                        unlink(public_path('assets/services/detail/'.$serviceDetailImage->service_image));
                    }
                }
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }

            // Delete the main service image

        try {
            if ($service->images && file_exists(public_path('assets/services/thumb/'.$service->images))) {
                unlink(public_path('assets/services/thumb/'.$service->images));
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
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
