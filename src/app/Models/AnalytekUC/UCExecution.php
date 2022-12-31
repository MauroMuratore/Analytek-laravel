<?php

namespace App\Models\AnalytekUC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UCExecution extends Model
{
    protected $table = "uc_executions";
    protected $fillable = ['uuid', 'id_use_case', 'time'];
    public $timestamps = false;
    use HasFactory;
    public $incrementing = false;

    public function uc_time_on_page(){
        return $this->hasMany(UCTimeOnPage::class, 'uuid_uc_exe', 'uuid');
    }

    public function useCase(){
        return $this->belongsTo(UseCase::class, 'id_use_case');
    }

}
