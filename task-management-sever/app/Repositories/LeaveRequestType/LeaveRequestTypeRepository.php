<?php

namespace App\Repositories\LeaveRequestType;

use App\Models\LeaveRequestType;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\Paginate\PaginateService;

class LeaveRequestTypeRepository implements LeaveRequestTypeRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function getAll()
    {
        return LeaveRequestType::get();
    }

    public function getById(int $id)
    {
        return LeaveRequestType::find($id);
    }
}
