<?php

namespace App\Providers;

use App\Services\Admin\LeaveRequest\LeaveRequestService;
use App\Services\Admin\LeaveRequest\LeaveRequestServiceInterface;
use App\Services\Auth\AuthService;
use App\Services\Auth\AuthServiceInterface;
use App\Services\File\FileService;
use App\Services\File\FileServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            PaginateServiceInterface::class,
            PaginateService::class,
        );
        $this->app->bind(
            FileServiceInterface::class,
            FileService::class
        );
        $this->app->bind(
            AuthServiceInterface::class,
            AuthService::class
        );
        $this->app->bind(
            LeaveRequestServiceInterface::class,
            LeaveRequestService::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
