<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\Project\ProjectRepositoryInterface;
use App\Services\Admin\Project\ProjectService;
use App\Traits\Authorizable;
use App\Traits\HttpResponsable;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    use Authorizable, HttpResponsable;

    private ProjectService $projectService;

    public function __construct(ProjectRepositoryInterface $projectRepository)
    {
        $this->projectService = new ProjectService($projectRepository);
    }

    public function index(Request $request)
    {
        try {
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
            $projectResponse = $this->projectService->index($options);
            return $this->success($projectResponse, trans('base.base-success'));
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }

    public function show($id)
    {
        try {
            $projectResponse = $this->projectService->show($id);
            return $this->success($projectResponse, trans('base.base-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('base.base-failed'));
        }
    }
}
