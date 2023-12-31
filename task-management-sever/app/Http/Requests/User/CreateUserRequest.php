<?php

namespace App\Http\Requests\User;

use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    use HttpResponsable;

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
            'email' => 'required|email|min:5|max:50|unique:users',
            'password' => 'required|string|min:5|max:50',
        ];
    }
}
