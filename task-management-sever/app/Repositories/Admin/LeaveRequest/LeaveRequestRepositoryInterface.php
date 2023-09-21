<?php

namespace App\Repositories\Admin\LeaveRequest;

interface LeaveRequestRepositoryInterface
{
    public function getLeaveRequests($options);
    public function getLeaveRequest(int $id);
    public function createLeaveRequest(array $leaveRequestDetails);
    public function updateLeaveRequest($leaveRequest, array $leaveRequestDetails);
}
