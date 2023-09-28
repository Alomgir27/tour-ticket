<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\Cart;

class CartService
{
    public $apiResponses;
    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }
    public function storeCart($cartData)
    {
        try {
            // Create the Cart
            $storeCart = Cart::create($cartData);

            return $this->apiResponses->sendResponse($storeCart, 'Cart created successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function updateCart($cartId, $updatedData)
    {
    try {
        // Find the cart by ID
        $cart = Cart::find($cartId);

        // Check if the record exists
        if (!$cart) {
            return $this->apiResponses->sendError('Cart not found', [], 404);
        }

        // Update the cart
        $cart->update($updatedData);

        return $this->apiResponses->sendResponse($cart, 'Cart updated successfully');

    } catch (\Throwable $th) {
        return $this->apiResponses->sendError($th->getMessage(), [], 500);
    }
    }


    public function getCart($cartId)
    {
        try {
            // Find the cart by ID
            $cart = Cart::find($cartId);

            // Check if the cart exists
            if (!$cart) {
                return $this->apiResponses->sendError('Cart not found', [], 404);
            }

            return $this->apiResponses->sendResponse($cart, 'Cart retrieved successfully');

        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }

    }

    public function deleteCart($cartId) {
        try {
            // Find the cart by ID
            $cart = Cart::find($cartId);

            // Check if the cart exists
            if (!$cart) {
                return $this->apiResponses->sendError('Cart not found', [], 404);
            }

            // Delete the cart
            $cart->delete();

            return $this->apiResponses->sendResponse([], 'Cart deleted successfully');

        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

}
