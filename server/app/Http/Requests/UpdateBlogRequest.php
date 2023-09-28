<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title'=>'nullable|string',
            'details' => 'nullable|string',
            'image'=>'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'tag'=>'nullable|string',
            'short_desc'=>'nullable|string'
        ];
    }
}
