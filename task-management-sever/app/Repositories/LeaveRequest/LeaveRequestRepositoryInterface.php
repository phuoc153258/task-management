<?php

namespace App\Repositories\LeaveRequest;

interface LeaveRequestRepositoryInterface
{
    public function list($options, int $id);
    public function show(int $id, int $user_id);
    public function create(array $leaveRequestDetails);
    public function update($leaveRequest, array $leaveRequestDetails);
}
