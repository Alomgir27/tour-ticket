<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\FavouriteController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\OverviewController;
use App\Http\Controllers\API\PurchaseHistoryController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\ServiceOverviewController;
use App\Http\Controllers\API\WhatIncludeController;
use Illuminate\Support\Facades\Route;
use App\Http\Requests\SignupRequest;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
});

Route::controller(OrderController::class)->group(
    function () {
        Route::get('order', 'index');
        Route::post('order', 'store');
        Route::get('order/{id}', 'show');
        Route::patch('order/{id}', 'update');
        Route::delete('order/{id}', 'destroy');
    }
);

Route::controller(BlogController::class)->group(function () {
    Route::get('blog', 'index');
    Route::post('blog', 'store');
    Route::get('blog/{id}', 'show');
    Route::patch('blog/{id}', 'update');
    Route::delete('blog/{id}', 'destroy');
});

Route::controller(ServiceController::class)->group(function () {
    Route::get('services', 'index');
    Route::post('services', 'store');
    Route::get('services/{id}', 'show');
    Route::patch('services/{id}', 'update');
    Route::delete('services/{id}', 'destroy');
});


Route::controller(OverviewController::class)->group(function () {
    Route::get('overview', 'index');
    Route::post('overview', 'store');
    Route::get('overview/{id}', 'show');
    Route::get('array/overview', 'showServiceOverviewByArrayId');
    Route::patch('overview/{id}', 'update');
    Route::delete('overview/{id}', 'destroy');
});

Route::controller(WhatIncludeController::class)->group(function () {
    Route::get('what-include', 'index');
    Route::post('what-include', 'store');
    Route::get('what-include/{id}', 'show');
    Route::get('array/what-include', 'showWhatIncludesByArrayId');
    Route::patch('what-include/{id}', 'update');
    Route::delete('what-include/{id}', 'destroy');
});

Route::controller(ServiceOverviewController::class)->group(function () {
    Route::get('service-overview', 'index');
    Route::post('service-overview', 'store');
    Route::get('service-overview/{id}', 'show');
    Route::patch('service-overview/{id}', 'update');
    Route::delete('service-overview/{id}', 'destroy');
});

Route::controller(CartController::class)->group(function () {
    Route::get('cart', 'index');
    Route::post('cart', 'store');
    Route::get('cart/{id}', 'show');
    Route::patch('cart/{id}', 'update');
    Route::delete('cart/{id}', 'destroy');
});


Route::controller(FavouriteController::class)->group(function () {
    Route::get('favourite', 'index');
    Route::post('favourite', 'store');
    Route::get('favourite/{id}', 'show');
    Route::put('favourite/{id}', 'update');
    Route::delete('favourite/{id}', 'destroy');
});

Route::controller(PurchaseHistoryController::class)->group(function () {
    Route::get('purchase-history', 'index');
    Route::post('purchase-history', 'store');
    Route::get('purchase-history/{id}', 'show');
    Route::put('purchase-history/{id}', 'update');
    Route::delete('purchase-history/{id}', 'destroy');
});


Route::get('createAdmin', function () {
    // Use Laravel's route function to create a request to the 'register' route
    $response = Route::dispatch(Request::create('/api/register', 'POST', [
        'name' => 'admin',
        'email' => 'admin@gmail.com',
        'password' => 'admin123',
        'role' => '1',
        'phone' => '123456789',
        'address' => 'admin address',
        'profile' => 'admin profile',
    ]));

    return $response;
});