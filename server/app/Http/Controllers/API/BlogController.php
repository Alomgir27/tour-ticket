<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Services\BlogService;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class BlogController extends Controller
{

    public function __construct(public BlogService $blogService)
    {
        $this->blogService = $blogService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->blogService->blogList();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
       return $this->blogService->storeBlog($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->blogService->blogDetails($id);
          
    }

    /**
     * Display all the top_blog
     */
    public function topBlogs(){
        return $this->blogService->getTopBlogs();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return $this->blogService->updateBlog($id, $request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //delete blog and its image

        return $this->blogService->deleteBlog($id);
    }
}
