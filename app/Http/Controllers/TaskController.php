<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function createTask(Request $request){
        $attr = $request->validate([
            'type' => 'required',
            'title' => 'required',
            'description'=>'required',
            'department' => 'required',
            'user_id' => 'required',
        ]);

        $task = Task::create([
            'type' => $attr['type'],
            'title' => $attr['title'],
            'description' => $attr['description'],
            'department' => $attr['department'],
            'user_id' => $attr['user_id']
        ]);
        
        return response($task,201);
    }

    public function getMyCreatedTasks($userId){
        $tasks = Task::where('user_id',$userId)->orderBy('created_at', 'desc')->with('user')->get();
        return response($tasks);
    }

    public function getMyToDoTasks($department){
        $tasks = Task::where('department',$department)->orderBy('created_at', 'desc')->with('user')->get();
        return response($tasks);
    }
}
