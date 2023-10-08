<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login', 'register', 'isUserExist']]);
    }

    public function login(LoginRequest $request)
    {
       
        $credentials = $request->validated();
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'user' => $user,
                'authorization' => [
                    'token' => $user->createToken('ApiToken')->plainTextToken,
                    'type' => 'bearer',
                ],
                'status' => 200
                ], 200);
        }

        return response()->json([
            'message' => 'Invalid credentials',
            'status' => 401
            ], 401);
    }

    public function register(SignupRequest $request)
    {
        // Log::info($request);
        $credentials = $request->validated();

        if(User::where('email', $credentials["email"])->exists()){
            return response()->json([
                'message' => 'Email already exists',
                'status' => 401
                ], 401);
        }

        $user = User::create([
            'name' => $credentials["name"],
            'email' => $credentials["email"],
            'password' => Hash::make($credentials["password"]),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'status' => 201
            ], 201);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Successfully logged out',
            'status' => 200
            ], 200);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function isUserExist(Request $request)
    {
        $user = User::where('email', $request['email'])->first();
        if($user){
            return response()->json([
                'message' => 'User exist',
                'status' => 200
                ], 200);
        }
        return response()->json([
            'message' => 'User does not exist',
            'status' => 401
            ], 401);
    }
}
