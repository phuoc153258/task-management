<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTaskRequest extends FormRequest
{
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
