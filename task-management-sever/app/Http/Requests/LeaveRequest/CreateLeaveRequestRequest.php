<?php

namespace App\Http\Requests\LeaveRequest;

use App\Traits\HttpResponseTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateLeaveRequestRequest extends FormRequest
{
    use HttpResponseTrait;

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
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ];
    }
}
