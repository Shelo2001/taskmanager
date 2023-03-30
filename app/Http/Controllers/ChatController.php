<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\SendMessageEvent;

class ChatController extends Controller
{
    public function sendMessage(Request $request,$chatId){
        $attr=$request->validate([
            'id'=>'required',
            'user'=>'required',
            'message'=>'required'
        ]);

        event(new SendMessageEvent($attr['message'],$attr['user'],$chatId));

        return response()->json(["message"=>"Successfully sent message"]);
    }
}
