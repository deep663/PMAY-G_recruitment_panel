<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CheckCookie
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('auth_token');

        if (!$token) {
            return response()->json(['message' => 'Unauthorized. No valid token found.'], 401);
        }

        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken || !$accessToken->tokenable) {
            return response()->json(['message' => 'Unauthorized. Invalid token.'], 401);
        }

        $user = $accessToken->tokenable;

        if ($user->user_id !== $request->user_id) {
            return response()->json(['message' => 'Unauthorized. User ID mismatch.'], 403);
        }

        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
