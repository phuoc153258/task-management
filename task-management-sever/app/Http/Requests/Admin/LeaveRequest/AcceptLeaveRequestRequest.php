<?php

namespace App\Http\Requests\Admin\LeaveRequest;

use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;

class AcceptLeaveRequestRequest extends FormRequest
{
    use Authorizable, HttpResponsable;
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
            'accept_by' =>  (int) $this->getCurrentUser()->id
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
            'status' => 'required|numeric|in:1,2',
            'accept_by' => 'nullable|numeric|min:1',
        ];
    }
}
