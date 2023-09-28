<?php

namespace App\Services\LeaveRequestType;

use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\LeaveRequestType\LeaveRequestTypeServiceInterface;

class LeaveRequestTypeService implements LeaveRequestTypeServiceInterface
{
    public function __construct(private LeaveRequestTypeRepositoryInterface $leaveRequestType)
    {
    }

    public function index()
    {
        return $this->leaveRequestType->getAll();
    }
}
