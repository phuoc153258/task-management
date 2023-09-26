<?php

namespace App\Repositories\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\Paginate\PaginateService;
use Illuminate\Support\Facades\DB;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function getLeaveRequests($options, int $id)
    {
        $query = LeaveRequest::with('leaveRequestType')->ofUser($id);
        $leaveRequestResponse = $this->paginateService->paginate($options, $query);
        return $leaveRequestResponse;
    }

    public function getLeaveRequest(int $id, int $user_id)
    {
        return LeaveRequest::ofUser($user_id)->find($id);
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
