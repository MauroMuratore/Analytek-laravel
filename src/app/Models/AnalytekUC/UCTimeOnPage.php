<?php

namespace App\Models\AnalytekUC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UCTimeOnPage extends Model
{
    protected $table = "uc_times_on_page";
    protected $fillable = ['uuid_uc_exe', 'page', 'time'];
    public $timestamps = false;
    use HasFactory;

    public function uc_execution(){
        return $this->belongsTo(UCExecution::class, 'uuid_uc_exe');
    }

}
