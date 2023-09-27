<?php

namespace App\Providers;

use App\Repositories\LeaveRequest\LeaveRequestRepository;
use App\Repositories\LeaveRequest\LeaveRequestRepositoryInterface;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepository;
use App\Repositories\LeaveRequestType\LeaveRequestTypeRepositoryInterface;
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
        $this->app->bind(
            LeaveRequestTypeRepositoryInterface::class,
            LeaveRequestTypeRepository::class,
        );
        $this->app->bind(
            'App\Repositories\Admin\LeaveRequest\LeaveRequestRepositoryInterface',
            'App\Repositories\Admin\LeaveRequest\LeaveRequestRepository'
        );
        $this->app->bind(
            'App\Repositories\Admin\User\UserRepositoryInterface',
            'App\Repositories\Admin\User\UserRepository'
        );
        $this->app->bind(
            'App\Repositories\Admin\Role\RoleRepositoryInterface',
            'App\Repositories\Admin\Role\RoleRepository'
        );
        $this->app->bind(
            'App\Repositories\Admin\Project\ProjectRepositoryInterface',
            'App\Repositories\Admin\Project\ProjectRepository'
        );
        $this->app->bind(
            'App\Repositories\Admin\Task\TaskRepositoryInterface',
            'App\Repositories\Admin\Task\TaskRepository'
        );
        $this->app->bind(
            'App\Repositories\Project\ProjectRepositoryInterface',
            'App\Repositories\Project\ProjectRepository'
        );
        $this->app->bind(
            'App\Repositories\UserProject\UserProjectRepositoryInterface',
            'App\Repositories\UserProject\UserProjectRepository'
        );
        $this->app->bind(
            'App\Repositories\Task\TaskRepositoryInterface',
            'App\Repositories\Task\TaskRepository'
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
