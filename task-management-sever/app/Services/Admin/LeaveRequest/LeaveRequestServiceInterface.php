<?php

namespace App\Services\Admin\LeaveRequest;

interface LeaveRequestServiceInterface
{
    public function index($options);
    public function show($id);
    public function update($leaveRequestDetails, $id);
}
