<?php

namespace App\Services\User;

interface UserServiceInterface
{
    public function update($userInfo, $id);

    public function password($userInfo, $id);
}
