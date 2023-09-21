<?php

namespace App\Repositories\LeaveRequest;

interface LeaveRequestRepositoryInterface
{
    public function getLeaveRequests($options, int $id);
    public function getLeaveRequest(int $id, int $user_id);
    public function createLeaveRequest(array $leaveRequestDetails);
    public function updateLeaveRequest($leaveRequest, array $leaveRequestDetails);
}
