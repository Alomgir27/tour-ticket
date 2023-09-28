<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\Order;
use Image;

class OrderService
{
    public $apiResponses;
    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }

    public function index()
    {
        try {
            $orderList = Order::where('user_id', auth()->user()->id)->get();
            return $this->apiResponses->sendResponse($orderList, 'Order List Card retrieved successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function store($request)
    {
        try {
            $order = Order::create([
                'user_id' => auth()->user()->id,
                'service_id' => $request->service_id,
                'quantity' => $request->quantity,
                'total_price' => $request->total_price,
                'status' => 'ordered',
            ]);
            return $this->apiResponses->sendResponse($order, 'Order Card created successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function show($id)
    {
        try {
            $order = Order::where('id', $id)->get();
            return $this->apiResponses->sendResponse($order, 'Order Card retrieved successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function update($updatedData, $id)
    {
        try {
            $order = Order::find($id);
            $order->update(
                [
                    'user_id' => auth()->user()->id ?? $id,
                    'service_id' => $updatedData->service_id ?? $order->service_id,
                    'quantity' => $updatedData->quantity ?? $order->quantity,
                    'total_price' => $updatedData->total_price ?? $order->total_price,
                    'status' => $updatedData->status ?? $order->status,
                ]
            );
            return $this->apiResponses->sendResponse($order, 'Order Card updated successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }
}
