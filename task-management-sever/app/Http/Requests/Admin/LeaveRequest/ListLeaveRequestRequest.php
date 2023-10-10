<?php

namespace App\Http\Requests\Admin\LeaveRequest;

use App\Enums\LeaveRequestStatus;
use App\Enums\SoftDeleteStatus;
use App\Models\LeaveRequest\LeaveRequest;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListLeaveRequestRequest extends FormRequest
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
            'page' => $this->input('page') === null ? config('paginate.default.page') : (int) $this->input('page'),
            'per_page' => $this->input('per_page') === null ? config('paginate.default.per_page') : (int) $this->input('per_page'),
            'search' => $this->input('search') === null ? config('paginate.default.search') : $this->input('search'),
            'sort' => $this->input('sort') === null ? config('paginate.default.sort') : $this->input('sort'),
            'search_by' =>  $this->input('search_by') === null ? config('paginate.leave_request.search_by') : $this->input('search_by'),
            'sort_by' =>  $this->input('sort_by') === null ? config('paginate.leave_request.sort_by') : $this->input('sort_by'),
            'soft_delete' =>  $this->input('soft_delete') === null ? config('paginate.default.soft_delete') : (int) $this->input('soft_delete'),
            'leave_request_status' =>  $this->input('leave_request_status') === null ? config('paginate.leave_request.status') : (int) $this->input('leave_request_status'),
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
            'soft_delete' => [
                'nullable',
                'numeric',
                Rule::in(SoftDeleteStatus::cases()),
            ],
            'search_by' => [
                'nullable',
                'string',
                Rule::in(LeaveRequest::getFields()),
            ],
            'sort_by' => [
                'nullable',
                'string',
                Rule::in(LeaveRequest::getFields()),
            ],
            'leave_request_status' => [
                'nullable',
                'numeric',
                'min:0',
                Rule::in(LeaveRequestStatus::cases()),
            ],
        ];
    }
}
