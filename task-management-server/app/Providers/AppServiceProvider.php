<?php

namespace App\Providers;

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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
