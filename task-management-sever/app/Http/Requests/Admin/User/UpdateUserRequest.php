<?php

namespace App\Http\Requests\Admin\User;

use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    use Authorizable, HttpResponsable;
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
            'username' => 'required|string|min:5|max:50',
            'fullname' => 'required|string|min:5|max:50',
            'email' => 'required|email|min:5|max:50',
            'role_id' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('roles', 'id'),
            ],
            'avatar' => 'nullable|max:2000|mimes:jpeg,png,jpg'
        ];
    }
}
