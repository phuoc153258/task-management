<?php

namespace App\Services\Admin\LeaveRequest;

interface LeaveRequestServiceInterface
{
    public function index($options);
    public function show($id);
    // public function create($leaveRequestDetails);
    public function update($leaveRequestDetails, $id);
    // public function delete($id, $user_id);
}
