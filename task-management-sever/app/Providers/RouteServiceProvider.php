<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            Route::prefix('api')->middleware('api')->group(
                function () {
                    Route::prefix('user')->group(base_path('routes/api/user.php'));
                    Route::prefix('auth')->group(base_path('routes/api/auth.php'));
                    Route::prefix('leave-request')->group(base_path('routes/api/leaveRequest.php'));
                    Route::prefix('leave-request-type')->group(base_path('routes/api/leaveRequestType.php'));
                    Route::prefix('project')->group(base_path('routes/api/project.php'));
                    Route::prefix('user-project')->group(base_path('routes/api/userProject.php'));
                    Route::prefix('task')->group(base_path('routes/api/task.php'));

                    Route::prefix('admin')->group(function () {
                        Route::prefix('leave-request')->group(base_path('routes/api/admin/leaveRequest.php'));
                        Route::prefix('user')->group(base_path('routes/api/admin/user.php'));
                        Route::prefix('role')->group(base_path('routes/api/admin/role.php'));
                        Route::prefix('project')->group(base_path('routes/api/admin/project.php'));
                    });
                }
            );
        });
    }
}
