<?php

namespace App\Providers;

use App\Models\Task;
use App\Models\TaskReport;
use App\Models\User;
use App\Models\UserProject;
use App\Observers\TaskObserver;
use App\Observers\TaskReportObserver;
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
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        User::observe(UserObserver::class);
        UserProject::observe(UserProjectObserver::class);
        TaskReport::observe(TaskReportObserver::class);
        Task::observe(TaskObserver::class);
    }
}
