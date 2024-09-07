<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;

use Illuminate\Support\Facades\Cookie;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $error_message = [
            'required' => ':attribute is a required field!',
        ];
    
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email', 'max:50', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ], $error_message);
    
        if ($validator->fails()) {
            $message = $validator->errors()->all();
            return response()->json(['message' => $message], 422);
        }
    
        $existingUser = User::where('email', $request->email)->first();
        if ($existingUser) {
            return response()->json([
                'status' => 409,
                'message' => 'User already exists'
            ], 409);
        }
    
        $date = now()->format('Ymd');
        $randomDigits = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
        $generatedId = 'PMAYG_' . $date . $randomDigits;
    
        try {
            $user = User::create([
                'user_id' => $generatedId,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            event(new Registered($user));
            $message = 'Successfully registered';
            return response()->json([
                'status' => 201,
                'message' => $message
            ], 201);
        } catch (Exception $e) {
            $message = $e->getMessage();
            return response()->json([
                'status' => 500,
                'message' => $message
            ], 500);
        }
    }
    
    public function signin(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:50', 'exists:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);
    
        $user = User::where('email', $data['email'])->first();
    
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid credentials'
            ], 401);
        }
    
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'status' => 403,
                'message' => 'Your email address is not verified. Please check your email to verify your account.'
            ], 403);
        }
    
        $token = $user->createToken('auth_token',['*'],now()->addMinutes(60))->plainTextToken;
        $email = $user->email;
        $userId = $user->user_id;
        $userName = $user->name;
    
        $cookie = cookie('auth_token', $token, 20, null, null, false, true,false,'None'); 
    
        return response()->json([
                'user_id' => $userId,
                'name' => $userName,
                'email' => $email,
                'token' => $cookie->getValue(),
        ], 200)->withCookie($cookie);
    }
}