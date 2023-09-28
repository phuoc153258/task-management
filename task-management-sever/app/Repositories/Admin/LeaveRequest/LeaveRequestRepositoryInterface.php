<?php

namespace App\Repositories\Admin\LeaveRequest;

interface LeaveRequestRepositoryInterface
{
    public function list($options);

    public function show(int $id);

    public function create(array $leaveRequestDetails);

    public function update($leaveRequest, array $leaveRequestDetails);

    public function deleteMany($user_id);
}
