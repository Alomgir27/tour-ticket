<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
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
            'title'=>'required|string',
            'details' => 'required|string',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
            'tag'=>'required|string',
            'short_desc'=>'required|string',
            'is_top_blog'=>'required|string',
        ];
    }
}
