<?php

namespace App\Repositories\LeaveRequest;

interface LeaveRequestRepositoryInterface
{
    public function getLeaveRequests($options, int $id);

    public function getLeaveRequest(int $id);
}
