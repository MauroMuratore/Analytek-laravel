<?php

namespace App\Models\AnalytekUC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UseCase extends Model
{
    protected $table = "use_cases";
    protected $fillable = ['id', 'name', 'max_time', 'pages'];
    public $timestamps = false;
    use HasFactory;

    public function uc_executions(){
        return $this->hasMany(UCExecution::class, 'id_use_case');
    }

}
