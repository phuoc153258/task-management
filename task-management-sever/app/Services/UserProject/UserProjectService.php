<?php

namespace App\Services\UserProject;

use App\Repositories\UserProject\UserProjectRepositoryInterface;

class UserProjectService implements UserProjectServiceInterface
{
    private UserProjectRepositoryInterface $userProjectRepository;
    public function __construct(UserProjectRepositoryInterface $UserProjectRepository)
    {
        $this->userProjectRepository = $UserProjectRepository;
    }

    public function index($options, $project_id, $user_id)
    {
        if (empty($this->userProjectRepository->getUserHasJoined($project_id, $user_id))) abort(400, trans('base.base-failed'));

        $userProjectResponse = $this->userProjectRepository->getList($options, $project_id, $user_id);
        return $userProjectResponse;
    }

    public function show($id, $project_id, $user_id)
    {
        if (!$this->userProjectRepository->getUserHasJoined($project_id, $user_id)) abort(400, trans('base.base-failed'));

        $userProjectResponse = $this->userProjectRepository->getById($id, $project_id);
        if (empty($userProjectResponse))
            abort(400, trans('base.base-failed'));

        return $userProjectResponse;
    }
}
