<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    function register(Request $req){
        
        
        $validator = $this->validate($req, [
            'UserName' => 'unique:users',
            'Email' => 'unique:users'

        ]);

        $user = new User;
        $user->UserName=$req->input("UserName");
        $user->FirstName=$req->input("FirstName");
        $user->LastName=$req->input("LastName");
        //$user->role=$req->input("role");
        $user->Email=$req->input("Email");
        $user->Password=Hash::make($req->input("Password"));
        $user->save();
            
        if($validator)
        {  
            return response()->json([
            'response' => $validator
            ], 200);
        }
        else   
        {
            return response()->json([
            'response' => $validator
            ], 200);
        }

      
    }

    function login(Request $req){
        $user = User::where("UserName",$req->UserName)->first();
        if(!$user||!Hash::check($req->Password,$user->Password))
        {
            return response()->json([
            'response' => "Error"
            ], 200);
        }
        else {
            return response()->json([
            'response' => "LoggedIn",
            'role' => $user->role,
            'id' => $user->ID
            ], 200);
        }
    }

    function userinfo($id) {
        return User::find($id);
    }
}
