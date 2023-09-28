<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(public OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        return $this->orderService->index();
    }

    public function store(StoreOrderRequest $request)
    {
        return $this->orderService->store($request->validated());
    }

    public function show($id)
    {
        return $this->orderService->show($id);
    }
}
