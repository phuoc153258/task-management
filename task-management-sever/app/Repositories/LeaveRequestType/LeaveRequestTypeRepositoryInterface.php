<?php

namespace App\Repositories\LeaveRequestType;

interface LeaveRequestTypeRepositoryInterface
{
    public function list();
    public function getById(int $id);
}
