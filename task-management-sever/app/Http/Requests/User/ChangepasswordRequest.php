<?php

namespace App\Http\Requests\User;

use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;

class ChangepasswordRequest extends FormRequest
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
            'old_password' => 'required|string|min:5|max:50',
            'password' => 'required|string|min:5|max:50',
        ];
    }
}
