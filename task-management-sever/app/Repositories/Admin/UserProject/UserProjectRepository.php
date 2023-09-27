<?php

namespace App\Repositories\Admin\UserProject;

use App\Models\UserProject;
use App\Repositories\Admin\UserProject\UserProjectRepositoryInterface;
use App\Services\Paginate\PaginateService;

class UserProjectRepository implements UserProjectRepositoryInterface
{
    private PaginateService $paginateService;

    public function __construct(PaginateService $paginateService)
    {
        $this->paginateService = $paginateService;
    }

    public function deleteMany($user_id)
    {
        UserProject::where('user_id', $user_id)
            ->chunk(100, function ($records) {
                foreach ($records as $record) {
                    $record->delete();
                }
            });
    }
}
