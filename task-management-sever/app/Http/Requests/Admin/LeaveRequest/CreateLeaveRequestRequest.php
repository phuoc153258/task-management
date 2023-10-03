<?php

namespace App\Http\Requests\Admin\LeaveRequest;

use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
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
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
            'user_id' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('users', 'id'),
            ]
        ];
    }
}