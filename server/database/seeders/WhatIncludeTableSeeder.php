<?php

namespace Database\Seeders;

use App\Models\WhatInclude;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WhatIncludeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WhatInclude::factory(100)->create();
    }
}
