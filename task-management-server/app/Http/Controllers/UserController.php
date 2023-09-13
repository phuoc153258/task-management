<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Http\Request;

use App\Traits\HttpResponseTrait;
use App\Repositories\User\UserRepositoryInterface;
use App\Services\File\FileService;

class UserController extends Controller
{
    use HttpResponseTrait;
    private FileService $fileService;
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->fileService = new FileService();
        $this->userRepository = $userRepository;
    }

    public function index(Request $request)
    {
        $options = [
            'search' => empty($request->input('search')) ? '' : $request->input('search'),
            'sort' =>  in_array($request->input('sort'), ['asc', 'desc']) ? $request->input('sort') : '',
            'limit' => empty($request->input('limit')) ? 5 : intval($request->input('limit')),
            'page' => empty($request->input('page')) ? 1 : intval($request->input('page')),
            'is_paginate' => filter_var($request->input('is_paginate', true), FILTER_VALIDATE_BOOLEAN),
            'search_by' => 'name',
            'sort_by' => 'id',
            'select' => ['*']
        ];
        $usersResponse = $this->userRepository->getUsers($options);
        return $this->success($usersResponse, trans('user.get-list-user-success'), 200);
    }

    public function show($id)
    {
        $user = $this->userRepository->getUserById($id);
        if (empty($user))
            return $this->error(null, trans('user.get-user-failed'), 400);

        return $this->success($user, trans('user.get-user-success'), 200);
    }

    // public function create(CreateUserRequest $request)
    // {
    //     $user = $this->userRepository->createUser($request->validated());
    //     return $this->success($user, trans('user.create-user-success'), 200);
    // }

    public function update(UpdateUserRequest $request, $id)
    {
        try {
            $user = $this->userRepository->getUserById($id);
            if (empty($user)) return $this->error(null, trans('user.user-is-not-exist'), 400);
            $this->fileService->delete($user->avatar);
            $infoUser = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => $request->input('password'),
                'avatar' => $this->fileService->upload($request->file('avatar'), 'avatar')
            ];
            $user->update($infoUser);
            return $this->success($user, trans('user.update-user-success'), 200);
        } catch (\Throwable $th) {
            return $this->error($th->getMessage(), trans('user.update-user-failed'), 400);
        }
    }

    public function delete($id)
    {
        $user = $this->userRepository->getUserById($id);
        if (empty($user)) return $this->error(null, trans('user.user-is-not-exist'), 400);

        $user->delete();
        return $this->success($user, trans('user.delete-user-success'), 200);
    }
}
