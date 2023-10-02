<?php

namespace App\Http\Requests\Task;

use App\Traits\Authorizable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTaskRequest extends FormRequest
{
    use Authorizable;
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
            'status' => 0
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
            'user_id' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('users', 'id'),
            ],
            'project_id' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('projects', 'id'),
            ],
            'title' => 'required|string|min:5|max:50',
            'description' => 'required|string|min:5|max:50',
            'hours' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ];
    }
}
