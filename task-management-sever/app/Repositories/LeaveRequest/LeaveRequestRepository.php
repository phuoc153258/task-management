<?php

namespace App\Repositories\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\Paginate\PaginateService;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{
    public function list($options, int $id)
    {
        $leaveRequestResponse = LeaveRequest::with('leaveRequestType')
            ->ofUser($id)
            ->whereRaw($options['search_by'] . " like '%" .  $options['search'] . "%'")
            ->when($options['sort'] !== '', function ($query)  use ($options) {
                return $query->orderBy($options['sort_by'], $options['sort']);
            })
            ->select(config('paginate.leave_request.select'))
            ->paginate($options['per_page'], ['page' => $options['page']]);

        return $leaveRequestResponse;
    }

    public function show(int $id, int $user_id)
    {
        return LeaveRequest::with('leaveRequestType')->ofUser($user_id)->find($id);
    }

    public function create(array $leaveRequestDetails)
    {
        return LeaveRequest::with('leaveRequestType')->create($leaveRequestDetails);
    }

    public function update($leaveRequest, array $leaveRequestDetails)
    {
        return $leaveRequest->update($leaveRequestDetails);
    }
}
