<?php

namespace App\Repositories\LeaveRequestType;

use App\Models\LeaveRequestType;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
use App\Services\Paginate\PaginateService;
use Illuminate\Support\Facades\DB;

class LeaveRequestTypeRepository implements LeaveRequestTypeRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct()
    {
        $this->paginateService = new PaginateService();
    }

    public function getAll()
    {
        return LeaveRequestType::all();
    }

    public function getById(int $id)
    {
        return LeaveRequestType::find($id);
    }
}
