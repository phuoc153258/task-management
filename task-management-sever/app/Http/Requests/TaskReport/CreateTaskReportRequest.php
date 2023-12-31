<?php

namespace App\Http\Requests\TaskReport;

use App\Enums\TaskStatus;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTaskReportRequest extends FormRequest
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
            'task_id' => [
                'required',
                'numeric',
                'min:1',
                Rule::exists('tasks', 'id'),
            ],
            'title' => 'required|string|min:5|max:50',
            'description' => 'required|string|min:5|max:50',
            'status' => [
                'required',
                'integer',
                'numeric',
                Rule::in(TaskStatus::cases())
            ],
        ];
    }
}
