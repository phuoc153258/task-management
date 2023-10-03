<?php

namespace App\Repositories\LeaveRequest;

use App\Enums\SoftDeleteStatus;
use App\Models\LeaveRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{
    public function list($options, int $id)
    {
        $leaveRequestResponse = LeaveRequest::with('leaveRequestType')
            ->ofUser($id)
            // ->when($options['soft_delete'] == SoftDeleteStatus::OnlySoftDelete->value, function ($query) {
            //     return $query->onlyTrashed();
            // })
            // ->when($options['soft_delete'] == SoftDeleteStatus::Both->value, function ($query) {
            //     return $query->withTrashed();
            // })
            ->when(isset($options['search_by']) && isset($options['search']), function ($query) use ($options) {
                return $query->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'");
            })
            ->when($options['sort'] !== '' && isset($options['sort_by']), function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.leave_request.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $leaveRequestResponse;
    }

    public function show(int $id, int $user_id, $isSoftDelete = false)
    {
        return LeaveRequest::with('leaveRequestType')
            ->ofUser($user_id)
            ->when($isSoftDelete, function ($query) use ($isSoftDelete) {
                return $query->withTrashed();
            })
            ->findOrFail($id);
    }

    public function create(array $leaveRequestDetails)
    {
        return LeaveRequest::with('leaveRequestType')->firstOrCreate($leaveRequestDetails);
    }
}
