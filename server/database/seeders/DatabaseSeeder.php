<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // WithoutModelEvents::disable();
        $this->call([
            UserTableSeeder::class,
            ServiceTableSeeder::class,
            BlogTableSeeder::class,
            CartTableSeeder::class,
            FavouriteTableSeeder::class,
            OrderTableSeeder::class,
            OverviewTableSeeder::class,
            PurchaseHistoryTableSeeder::class,
            ServiceDetailImageTableSeeder::class,
            ServiceDetailPackageTableSeeder::class,
            ServiceExperianceTableSeeder::class,
            ServiceOverviewTableSeeder::class,
            ServiceWhatIncludedTableSeeder::class,
            WhatIncludeTableSeeder::class,
        ]);
    }
}
