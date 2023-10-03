<?php

namespace App\Http\Requests\Admin\Project;

use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateProjectRequest extends FormRequest
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
            'created_by' => $this->getCurrentUser()->id,
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
            'title' => 'required|string|min:5|max:50',
            'description' => 'required|string|min:5|max:50',
            'status' => 'required|in:1,2',
            'created_by' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('users', 'id'),
            ]
        ];
    }
}
