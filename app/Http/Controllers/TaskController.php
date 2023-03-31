<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use App\Events\NotificationsForDepartmentsEvent;

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


        event(new NotificationsForDepartmentsEvent($attr['department'], $task, "Created task"));
        
        return response($task,201);
    }

    public function getMyCreatedTasks($userId){
        $tasks = Task::where('user_id',$userId)->orderBy('created_at', 'desc')->with('user')->get();
        return response($tasks);
    }

    public function getMyToDoTasks($department,$userId){
        $tasks = Task::where('department',$department)->where('assignee','=',null)->orderBy('created_at', 'desc')->with('user')->get();
        return response($tasks);
    }

    public function getMyAssignedTasks($userId){
        $tasks = Task::where('assignee',$userId)->where('status',"!=","Finished")->orderBy('created_at', 'desc')->with('user')->get();
        return response($tasks);
    }

    public function getTaskById($taskId){
        $task = Task::where('id',$taskId)->with('user')->firstOrFail();
        $assignee=User::where('id', $task->assignee)->first();
        return response(["task"=>$task,"assignee"=>$assignee]);
    }

    public function updateTaskToAssigneeAndInProgress(Request $request,$taskId){
        $attr = $request->validate([
            'assignee' => 'required',
            'status' => 'required',
            'taskDepartment' => 'required'
        ]);

        Task::where('id', $taskId)->update([
            'assignee' =>  $attr['assignee'],
            'status' =>  $attr['status'],
        ]);
        $task = Task::where('id', $taskId)->first();
        event(new NotificationsForDepartmentsEvent($attr['taskDepartment'], $task, "In progress"));

        return response()->json(["success"=>"successfully updated"]);
    }
    
    public function updateTaskToFinished(Request $request,$taskId){
        $attr = $request->validate([
            'taskDepartment'=>"required"
        ]);

        Task::where('id', $taskId)->update([
            'status' => "Finished",
        ]);

        $task = Task::where('id', $taskId)->first();
        event(new NotificationsForDepartmentsEvent($attr['taskDepartment'], $task, "Finished task"));  

        return response()->json(["success"=>"successfully finished"]);
    }

    public function deleteTask(Request $request,$taskId){
        $task = Task::find($taskId);
        if ($task) {
          $task->delete();
          return response()->json(['message' => 'Task deleted successfully']);
        } else {
          return response()->json(['message' => 'Task not found'], 404);
        }
    }

}
