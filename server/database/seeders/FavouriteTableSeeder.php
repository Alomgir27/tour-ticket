<?php

namespace Database\Seeders;

use App\Models\Favourite;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FavouriteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Favourite::factory(100)->create();
    }
}
