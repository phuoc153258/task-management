<?php

namespace App\Repositories\LeaveRequest;

use App\Models\LeaveRequest;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Services\Paginate\PaginateService;
use Illuminate\Support\Facades\DB;

class LeaveRequestRepository implements LeaveRequestRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct()
    {
        $this->paginateService = new PaginateService();
    }

    public function getLeaveRequests($options, int $id)
    {
        $query = DB::table('leave_requests')->where('user_id', $id);
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
