<?php

namespace App\Repositories\Admin\LeaveRequest;

use App\Enums\LeaveRequestStatus;
use App\Enums\SoftDeleteStatus;
use App\Models\LeaveRequest\LeaveRequest;
use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{

    public function list($options)
    {
        $leaveRequestResponse = LeaveRequest::with(['leaveRequestType', 'user'])
            ->when($options['soft_delete'] == SoftDeleteStatus::OnlySoftDelete->value, function ($query) {
                return $query->onlyTrashed();
            })
            ->when($options['soft_delete'] == SoftDeleteStatus::Both->value, function ($query) {
                return $query->withTrashed();
            })
            ->when($options['leave_request_status'] == LeaveRequestStatus::Pending->value, function ($query) {
                return $query->pendingStatus();
            })
            ->when($options['leave_request_status'] == LeaveRequestStatus::Accept->value
                || $options['leave_request_status'] == LeaveRequestStatus::Reject->value, function ($query) {
                return $query->notPendingStatus();
            })
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

    public function show(int $id)
    {
        return LeaveRequest::withTrashed()->findOrFail($id);
    }

    public function create(array $leaveRequestDetails)
    {
        return LeaveRequest::firstOrCreate($leaveRequestDetails);
    }

    public function deleteMany($user_id)
    {
        return LeaveRequest::ofUser($user_id)->delete();
    }
    public function restoreMany($user_id)
    {
        return LeaveRequest::ofUser($user_id)->withTrashed()->restore();
    }
    public function forceMany($user_id)
    {
        return LeaveRequest::ofUser($user_id)->withTrashed()->forceDelete();
    }
}
