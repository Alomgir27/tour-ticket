<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseHistory extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];

    public function user(){
        $this->belongsTo(User::class,'user_id','id');
    }

    public function service(){
        $this->belongsTo(Service::class,'service_id','id');
    }
}
