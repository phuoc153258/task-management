<?php

namespace App\Providers;

use App\Repositories\LeaveRequest\LeaveRequestRepository;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            LeaveRequestRepositoryInterface::class,
            LeaveRequestRepository::class,

        );
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
