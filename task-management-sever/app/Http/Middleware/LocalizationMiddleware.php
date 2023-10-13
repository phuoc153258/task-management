<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class LocalizationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $langs = config('lang.country');
        $defaultLang = config('lang.country')[0];

        if (in_array($request->header('Localization'), $langs)) $defaultLang = $request->header('Localization');
        App::setLocale($defaultLang);

        return $next($request);
    }
}
