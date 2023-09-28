<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Services\CartService;

class CartController extends Controller
{

    public function __construct(public CartService $cartService)
    {
        $this->cartService = $cartService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCartRequest $request)
    {
        return $this->cartService->storeCart($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->cartService->getCart($id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, string $id)
    {
        return $this->cartService->updateCart($id, $request->validated());

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->cartService->deleteCart($id);
    }
}
