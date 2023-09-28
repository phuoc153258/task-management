<?php

namespace App\Services\User;

use App\Repositories\User\UserRepositoryInterface;
use App\Services\File\FileService;
use App\Services\User\UserServiceInterface;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{

    public function __construct(private UserRepositoryInterface $userRepository, private FileService $fileService)
    {
    }

    public function index($options)
    {
        return $this->userRepository->list($options);
    }

    public function show($id)
    {
        $userResponse =  $this->userRepository->getById($id);
        if (!$userResponse) abort(400, trans('base.base-failed'));

        return $userResponse;
    }

    public function create($userInfo)
    {
        return $this->userRepository->create($userInfo);
    }

    public function update($userInfo, $id, $avatar)
    {
        $user = $this->userRepository->getById($id);
        if (empty($user)) abort(400, trans('user.user-is-not-exist'));

        $infoUser = [
            'fullname' => $userInfo['fullname'],
            'email' => $userInfo['email'],
            'avatar' => $this->fileService->upload($avatar, 'avatar'),
        ];
        $this->fileService->delete($user->avatar);
        $user->update($infoUser);

        return $user;
    }

    public function password($userInfo, $id)
    {
        $user = $this->userRepository->getById($id);
        if (empty($user)) abort(400, trans('user.user-is-not-exist'));

        if (!Hash::check($userInfo['old_password'], $user->password)) abort(400, 'Old password is not correct');
        $user->update($userInfo);

        return $user;
    }

    public function delete($id)
    {
        $user = $this->userRepository->getById($id);
        if (empty($user)) abort(400, trans('user.user-is-not-exist'));

        $user->delete();
    }
}
