<?php

namespace App\Services\Admin\User;

interface UserServiceInterface
{
    public function index($options);

    public function show($id);

    public function create($userInfo);

    public function update($userInfo, $id, $avatar);

    public function password($id);

    public function delete($id);
}
