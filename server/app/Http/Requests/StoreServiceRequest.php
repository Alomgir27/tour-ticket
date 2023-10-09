<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            //service validation
            'title' => 'required|string',
            'tags' => 'required|string',
            'discount' => 'required|string',
            'price' => 'required|string',
            'images' => 'required|mimes:jpeg,png,jpg',
            'short_description' => 'required|string',
            'activity_feature' => 'required|string',
            'category' => 'required|string',
            //service details images validation
            'detail_images' => 'required',
            //service details package validation
            'tour_date' => 'required',
            'tour_type' => 'required',
            'meeting_point' => 'required',
            'opening_hours' => 'required',
            'ticket_details' => 'required',
            //service experiance validation
            'full_description' => 'required|string',
            'highlights' => 'required|string',
            'important_information' => 'required|string',
            //service overview validation
            'service_overviews' => 'required|string',
            //service what included validation
            'service_includes' => 'required|string',
        ];
    }

}
