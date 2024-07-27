<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function login(Request $request){
        if(Auth::attempt($request->only('email', 'password'))){
            $token = $request->user()->createToken('login')->plainTextToken;
            return response()->json(['token' => $token], 200);

        } else{
            return "Not authorized";
        }
    
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function logout(Request $request){
        // Revoke all tokens...
        if(Auth::attempt($request->only('email', 'password'))){
            $request->user()->tokens()->delete();
            return response()->json(
                [
                    'message' => 'Logout', 
                    'tokens' => $request->user()->tokens
                ], 
                200
            );
        }



    }
}
