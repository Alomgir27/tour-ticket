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

   
    public function getServiceList($search, $category, $startDate, $endDate, $sort, $startHour, $endHour, $lowerPrice, $higherPrice, $page)
    {
        $paginate = 10;
    
        $query = Service::with(['whatIncludes','serviceExp','serviceOverview','serviceDetailPackage','detailImages']);
    
        if($search){
            $query->where('title', 'LIKE', "%{$search}%");
        }
    
        if($category){
            $categoryList = explode(' ', $category);
            // Match any of the category
            $query->where(function ($query) use ($categoryList) {
                foreach ($categoryList as $category) {
                    $query->orWhere('category', 'LIKE', "%{$category}%");
                }
            });
        }
    
        if($sort){
            // Sort by various criteria
            if($sort == 'asc'){
                $query->orderBy('created_at', 'asc');
            } else if($sort == 'desc'){
                $query->orderBy('created_at', 'desc');
            } else if($sort == 'price-asc'){
                $query->orderBy('price', 'asc');
            } else if($sort == 'price-desc'){
                $query->orderBy('price', 'desc');
            } else if($sort == 'name-asc'){
                $query->orderBy('title', 'asc');
            } else if($sort == 'name-desc'){
                $query->orderBy('title', 'desc');
            }
        }
    
        if($startHour && $endHour){
            $query->whereHas('serviceDetailPackage', function($q) use ($startHour, $endHour) {
                $q->where('opening_hours', '>=', $startHour);
                $q->where('opening_hours', '<=', $endHour);
            });
        } elseif($startHour){
            $query->whereHas('serviceDetailPackage', function($q) use ($startHour) {
                $q->where('opening_hours', '>=', $startHour);
            });
        } elseif($endHour){
            $query->whereHas('serviceDetailPackage', function($q) use ($endHour) {
                $q->where('opening_hours', '<=', $endHour);
            });
        }
    
        if($startDate && $endDate){
            $query->whereHas('serviceDetailPackage', function($q) use ($startDate, $endDate) {
                $q->where('tour_date', '>=', $startDate);
                $q->where('tour_date', '<=', $endDate);
            });
        } elseif($startDate){
            $query->whereHas('serviceDetailPackage', function($q) use ($startDate) {
                $q->where('tour_date', '>=', $startDate);
            });
        } elseif($endDate){
            $query->whereHas('serviceDetailPackage', function($q) use ($endDate) {
                $q->where('tour_date', '<=', $endDate);
            });
        }
    
        if($lowerPrice){
            $lowerPrice = (int)$lowerPrice;
            $query->where('price', '>=', $lowerPrice);
        }
    
        if($higherPrice){
            $higherPrice = (int)$higherPrice;
            $query->where('price', '<=', $higherPrice);
        }
    
        $serviceList = $query->paginate($paginate, ['*'], 'page', $page);
    
        // Update the image path
        foreach ($serviceList as $service) {
            $service->images = '/assets/services/thumb/' . $service->images;
        }
    
        foreach ($serviceList as $service) {
            foreach ($service->detailImages as $detailImage) {
                $detailImage->service_image = '/assets/services/detail/' . $detailImage->service_image;
            }
        }
    
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
                    'category' => $serviceData['category'],
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
                    'category' => $updatedServiceData['category'],
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
            $service = Service::with(['whatIncludes','serviceExp','serviceOverview','serviceDetailPackage','detailImages'])->findOrFail($id);
            $service->images = '/assets/services/thumb/' . $service->images;
            foreach ($service->detailImages as $detailImage) {
                $detailImage->service_image = '/assets/services/detail/' . $detailImage->service_image;
            }
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
