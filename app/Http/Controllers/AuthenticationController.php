<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function register(Request $request){
        $attr = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'department'=>'required',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'department' => $attr['department'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);
        $token = $user->createToken('Tokens')->plainTextToken;
        return response([
            "token"=>$token,
            "user"=>$user
        ],201);
    }

    public function login(Request $request){
        $attr = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'error' => 'Credentials not match',
            ], 401);
        }

        $user = Auth::user();

        if (!$user || !$user->is_active) {
            return response()->json([
                'error' => 'User is not active',
            ], 401);
        }

        return response([
            'token' => auth()->user()->createToken('Tokens')->plainTextToken,
            'user' => auth()->user()
        ], 200);
    }

    public function logout(Request $request){
        auth()->user()->currentAccessToken()->delete();

        return response(["message"=>"Successfully logged out"],200);
    }

    public function getById(User $user){
        return response($user);
    }

    public function getAllUsers(){
        $users=User::all();

        return response($users);
    }
}