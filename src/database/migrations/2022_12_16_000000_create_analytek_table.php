 <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnalytekTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('use_cases', function(Blueprint $table){
            $table->id();
            $table->text('name');
            $table->text('description');
            $table->integer('max_time');
            $table->text('pages');
        });
        Schema::create('uc_executions', function(Blueprint $table){
            $table->uuid('uuid')->primary();
            $table->foreignUuid('id_use_case')->costrained('use_cases');
            $table->integer('time');
        });
        Schema::create('uc_times_on_page', function(Blueprint $table){
            $table->id();
            $table->uuid('uuid_uc_exe')->costrained('uc_executions');
            $table->text('page');
            $table->integer('time');
            $table->integer('order');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('use_cases');
        Schema::dropIfExists('uc_executions');
        Schema::dropIfExists('uc_times_on_page');
    }
}
