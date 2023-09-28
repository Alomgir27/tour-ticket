<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
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
            'title' => 'nullable|string',
            'tags' => 'nullable|string',
            'discount' => 'nullable|string',
            'price' => 'nullable|string',
            'images' => 'nullable|mimes:jpeg,png,jpg',
            'activity_feature' => 'nullable|string',
        ];
    }

}
