<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Services\FavouriteService;

class FavouriteController extends Controller
{

    public function __construct(public FavouriteService $favService)
    {
        $this->favService = $favService;
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
        return $this->favService->storeFavourite($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->favService->getFavourite($id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, string $id)
    {
        return $this->favService->updateFavourite($id, $request->validated());

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->favService->deleteFavourite($id);
    }
}
