<?php

namespace App\Repositories\Admin\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\Paginate\PaginateService;
use Illuminate\Support\Facades\DB;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function getLeaveRequests($options)
    {
        $query = LeaveRequest::with('leaveRequestType')->status();
        $leaveRequestResponse = $this->paginateService->paginate($options, $query);
        return $leaveRequestResponse;
    }

    public function getLeaveRequest(int $id)
    {
        return LeaveRequest::status()->find($id);
    }

    public function createLeaveRequest(array $leaveRequestDetails)
    {
        return LeaveRequest::create($leaveRequestDetails);
    }

    public function updateLeaveRequest($leaveRequest, array $leaveRequestDetails)
    {
        return $leaveRequest->update($leaveRequestDetails);
    }
}
