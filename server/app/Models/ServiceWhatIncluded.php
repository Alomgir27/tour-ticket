<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceWhatIncluded extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];
    protected $guarded = ['created_at', 'updated_at'];

    public function service(){
        return $this->belongsTo(Service::class, 'service_id');
    }
}
