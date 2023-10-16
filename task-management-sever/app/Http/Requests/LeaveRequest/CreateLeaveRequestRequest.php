<?php

namespace App\Http\Requests\LeaveRequest;

use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateLeaveRequestRequest extends FormRequest
{
    use HttpResponsable, Authorizable;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->getCurrentUser()->id,
            'leave_registration_date' => formatDate($this->input('leave_registration_date'), 'Y-m-d'),
        ]);
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'content' => 'required|string|min:5|max:50',
            'leave_request_type_id' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('leave_request_types', 'id'),
            ],
            'leave_registration_date' => 'required|date|date_format:Y-m-d|after_or_equal:today',
            'user_id' => [
                'nullable',
                'numeric',
                'min:1',
                Rule::exists('users', 'id'),
            ]
        ];
    }
}
