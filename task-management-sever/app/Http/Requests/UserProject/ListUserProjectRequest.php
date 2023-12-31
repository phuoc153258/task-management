<?php

namespace App\Http\Requests\UserProject;

use App\Models\UserProject\UserProject;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListUserProjectRequest extends FormRequest
{
    use HttpResponsable;

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
            'page' => $this->input('page') === null ? config('paginate.default.page') : (int) $this->input('page'),
            'per_page' => $this->input('per_page') === null ? config('paginate.default.per_page') : (int) $this->input('per_page'),
            'search' => $this->input('search') === null ? config('paginate.default.search') : $this->input('search'),
            'sort' => $this->input('sort') === null ? config('paginate.default.sort') : $this->input('sort'),
            'search_by' =>  $this->input('search_by') === null ? config('paginate.user_project.search_by') : $this->input('search_by'),
            'sort_by' =>  $this->input('sort_by') === null ? config('paginate.user_project.sort_by') : $this->input('sort_by'),
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
            'page' => 'nullable|numeric|min:1',
            'per_page' => 'nullable|numeric|min:1',
            'search' => 'nullable|string',
            'sort' => 'in:"","asc","desc"',
            'search_by' => [
                'nullable',
                'string',
                Rule::in(UserProject::getFields()),
            ],
            'sort_by' => [
                'nullable',
                'string',
                Rule::in(UserProject::getFields()),
            ],
        ];
    }
}
