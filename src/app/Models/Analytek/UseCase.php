<?php

namespace App\Models\Analytek;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UseCase extends Model
{
    protected $table = "use_cases";
    protected $fillable = ['id', 'name', 'max_time', 'last_page'];
    public $timestamps = false;
    use HasFactory;

    public function perfomance(){
        return $this->hasMany(UseCase::class, 'id_use_case');
    }

}
