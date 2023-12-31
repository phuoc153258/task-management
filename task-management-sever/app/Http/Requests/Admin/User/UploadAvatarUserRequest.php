<?php

namespace App\Http\Requests\Admin\User;

use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;

class UploadAvatarUserRequest extends FormRequest
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
            'avatar' => 'required|max:2000|mimes:jpeg,png,jpg'
        ];
    }
}
