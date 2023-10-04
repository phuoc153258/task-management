<?php

namespace App\Http\Requests\Task;

use App\Enums\TaskStatus;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTaskRequest extends FormRequest
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
            'status' => config('paginate.task.status')
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
            'created_by' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('users', 'id'),
            ],
            'status' => [
                'required',
                'numeric',
                Rule::in(TaskStatus::cases())
            ],
        ];
    }
}
