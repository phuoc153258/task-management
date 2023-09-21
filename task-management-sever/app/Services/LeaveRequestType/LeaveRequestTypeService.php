<?php

namespace App\Services\LeaveRequestType;

use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\LeaveRequestType\LeaveRequestTypeServiceInterface;

class LeaveRequestTypeService implements LeaveRequestTypeServiceInterface
{
    private LeaveRequestTypeRepositoryInterface $leaveRequestType;

    public function __construct(LeaveRequestTypeRepositoryInterface $leaveRequestType)
    {
        $this->leaveRequestType = $leaveRequestType;
    }

    public function index()
    {
        return $this->leaveRequestType->getAll();
    }
}
