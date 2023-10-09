<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_detail_packages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->string('tour_date');
            $table->string('tour_type');
            $table->enum('is_online', ['0', '1'])->default('0');
            $table->string('meeting_point'); 
            $table->string('opening_hours');
            $table->text('ticket_details');
            $table->timestamps();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_detail_packages');
    }
};
