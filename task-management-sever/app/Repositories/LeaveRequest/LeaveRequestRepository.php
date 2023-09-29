<?php

namespace App\Repositories\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{
    public function list($options, int $id)
    {
        $leaveRequestResponse = LeaveRequest::with('leaveRequestType')
            ->ofUser($id)
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

    public function show(int $id, int $user_id)
    {
        return LeaveRequest::with('leaveRequestType')->ofUser($user_id)->findOrFail($id);
    }

    public function create(array $leaveRequestDetails)
    {
        return LeaveRequest::with('leaveRequestType')->firstOrCreate($leaveRequestDetails);
    }

    public function update($leaveRequest, array $leaveRequestDetails)
    {
        return $leaveRequest->update($leaveRequestDetails);
    }
}
