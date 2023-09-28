<?php

namespace App\Services;

use App\Http\Controllers\API\ApiResponseController;
use App\Models\Blog;
use Image;

class BlogService
{
    public $apiResponses;
    public function __construct(ApiResponseController $apiResponses)
    {
        $this->apiResponses = $apiResponses;
    }
    public function blogList()
    {
        try {
            $blogListCard = Blog::select('id', 'title', 'thumbnail', 'tag', 'short_desc')->paginate(4);
            return $this->apiResponses->sendResponse($blogListCard, 'Blog List Card retrieved successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function storeBlog($blogData)
    {
        try {
            if ($blogData['image']) {
                $image = $blogData['image'];
                $imageName = time() . '_' . $image->getClientOriginalName();
                $img = Image::make($image->path());
                $img->resize(340, 170, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(public_path('assets/blog/thumb/' . $imageName));
                $image->move(public_path('assets/blog/'), $imageName);
            }

            $blog = Blog::create([
                'title' => $blogData['title'],
                'details' => $blogData['details'],
                'thumbnail' => '/assets/blog/thumb/' . $imageName,
                'image' => '/assets/blog/' . $imageName,
                'tag' => $blogData['tag'],
                'short_desc' => $blogData['short_desc'],
            ]);

            if (!$blog) {
                return $this->apiResponses->sendError('Blog not created', [], 500);
            }

            return $this->apiResponses->sendResponse($blog, 'Blog created successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function blogDetails($blogId)
    {
        try {
            $blog = Blog::findOrFail($blogId);
            return $this->apiResponses->sendResponse($blog, 'Blog retrieved successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }


    public function updateBlog($blogId, $blogData)
    {
        try {
            $blog = Blog::findOrFail($blogId);

            if ($blogData['image']) {
                $oldImage = $blog->image;
                $oldThumb = $blog->thumbnail;
                unlink(public_path($oldImage));
                unlink(public_path($oldThumb));
                $image = $blogData['image'];
                $imageName = time() . '_' . $image->getClientOriginalName();
                $img = Image::make($image->path());
                $img->resize(340, 170, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(public_path('assets/blog/thumb/' . $imageName));
                $image->move(public_path('assets/blog/'), $imageName);
            }
            $blog->update([
                'title' => $blogData['title'],
                'details' => $blogData['details'],
                'thumbnail' => '/assets/blog/thumb/' . $imageName,
                'image' => '/assets/blog/' . $imageName,
                'tag' => $blogData['tag'],
                'short_desc' => $blogData['short_desc'],
            ]);

            if (!$blog) {
                return $this->apiResponses->sendError('Blog not updated', [], 500);
            }

            return $this->apiResponses->sendResponse($blog, 'Blog updated successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }

    public function deleteBlog($cartId)
    {
        try {
            $blog = Blog::findOrFail($cartId);
            $oldImage = $blog->image;
            $oldThumb = $blog->thumbnail;
            if (file_exists(public_path('assets/blog/thumb/' . $oldImage))) {
                unlink(public_path('assets/blog/thumb/' . $oldImage));
            }
            if (file_exists(public_path('assets/blog/' . $oldThumb))) {
                unlink(public_path('assets/blog/' . $oldThumb));
            }
            $blog->delete();
            return $this->apiResponses->sendResponse([], 'Blog deleted successfully');
        } catch (\Throwable $th) {
            return $this->apiResponses->sendError($th->getMessage(), [], 500);
        }
    }
}
