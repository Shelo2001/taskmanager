<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        Department::create([
            'title' => 'IT'
        ]);
        Department::create([
            'title' => 'Sales'
        ]);
        Department::create([
            'title' => 'Support'
        ]);
        Department::create([
            'title' => 'Developers'
        ]);
    }
}