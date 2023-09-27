<?php

namespace App\Providers;

use App\Models\User;
use App\Models\UserProject;
use App\Observers\UserObserver;
use App\Observers\UserProjectObserver;
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
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        User::observe(UserObserver::class);
        UserProject::observe(UserProjectObserver::class);
    }
}
