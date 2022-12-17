<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfomanceData extends Model
{
    protected $table = "uses_cases";
    protected $fillable = ['id', 'name', 'max_time', 'last_page'];
    public $timestamps = false;
    use HasFactory;

    public function perfomance(){
        return $this->hasMany(UseCase::class, 'id_use_case');
    }

}
