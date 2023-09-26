<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginateResource;
use App\Http\Resources\UserProjectResource;
use App\Repositories\UserProject\UserProjectRepositoryInterface;
use App\Services\UserProject\UserProjectService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class UserProjectController extends Controller
{
    use HttpResponsable, Authorizable;
    private UserProjectService $userProjectService;

    public function __construct(UserProjectService $userProjectService)
    {
        $this->userProjectService = $userProjectService;
    }

    public function index(Request $request, $project_id)
    {
        try {
            $user = $this->getCurrentUser();
            $options = [
                'search' => empty($request->input('search')) ? '' : $request->input('search'),
                'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
                'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
                'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
                'search_by' => 'content',
                'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
                'sort_by' => empty($request->input('sort_by')) ? 'id' : $request->input('sort_by'),
                'select' => ['*']
            ];
            $userProjectResponse = $this->userProjectService->index($options, $project_id, $user->id);
            return $this->success(new PaginateResource($userProjectResponse, UserProjectResource::collection($userProjectResponse->items())), trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id, $project_id)
    {
        try {
            $user = $this->getCurrentUser();
            $userProjectResponse = $this->userProjectService->show($id, $project_id, $user->id);
            return $this->success(new UserProjectResource($userProjectResponse), trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
