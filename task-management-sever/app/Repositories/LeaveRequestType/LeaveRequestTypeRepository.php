<?php

namespace App\Repositories\LeaveRequestType;

use App\Models\LeaveRequestType\LeaveRequestType;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;

class LeaveRequestTypeRepository implements LeaveRequestTypeRepositoryInterface
{

    public function list()
    {
        return LeaveRequestType::get();
    }

    public function getById(int $id)
    {
        return LeaveRequestType::find($id);
    }
}
