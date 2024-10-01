<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Constrain;

class ConstrainController extends Controller
{
    function addConstrain(Request $req){
        $constrain = new Constrain;
        $constrain->course_id = $req->input("course_id");
        $constrain->semester = $req->input("semester");
        $constrain->constrain_id = $req->input("constrain_id");
        $constrain->status = $req->input("status");
        $constrain->save();
    }

    function fetchConstrain() {
        return Constrain::all();
    }

    function updateConstrain($id,Request $req){

        $constrain = Constrain::find($id);
        $constrain->course_id = $req->input("course_id");
        $constrain->semester = $req->input("semester");
        $constrain->constrain_id = $req->input("constrain_id");
        $constrain->status = $req->input("status");
        $constrain->save();
    }

    function prefillConstrain($id) {
        return Constrain::find($id);
    }

    function deleteConstrain($id){
        Constrain::find($id)->delete();
    }

    function searchConstrain($key)
    {
       $value= Constrain::where('constrains_type','LIKE',"%$key")->get();
       if($value)
       {
           return $value;
       }
       else
       {
        return response()->json([
            'response' => "notfound"
            ], 200);
       }
    }

}
