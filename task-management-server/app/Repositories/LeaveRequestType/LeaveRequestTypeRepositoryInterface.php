<?php

namespace App\Repositories\LeaveRequestType;

interface LeaveRequestTypeRepositoryInterface
{
    public function getAll();
    public function getById(int $id);
}
