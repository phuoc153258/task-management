<?php

namespace App\Services\LeaveRequest;

interface LeaveRequestServiceInterface
{
    public function index($options, $user_id);

    public function show($id, $user_id);

    public function create($leaveRequestDetails);

    public function update($leaveRequestDetails, $id, $user_id);

    public function delete($id, $user_id);

    public function restore($id, $user_id);

    public function force($id, $user_id);
}
