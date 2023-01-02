# Analytek
Un modulo da aggiungere a un progetto laravel dei cookie analitici che permettono di registrare il percorso e il tempo per i diversi casi d'uso.

## Come usarlo
* Scaricare e aggiungere il modulo al progetto laravel, si può usare lo script git-install.sh<br /> 
* fare la migrazione e il seed <br /> 
` php artisan migrate:refresh --path=/database/migrations/2022_12_16_000000_create_analytek_table.php ` <br /> 
` php artisan db:seed --class=UseCaseSeeder ` <br /> 
* aggiungere a route/api.php le seguenti linee <br /> 
` use App\Http\Controllers\AnalytekUC\UseCaseController` <br />
` Route::get('/use_cases', [UseCaseController::class, 'getUseCases']); ` <br /> 
` Route::get('/use_cases/{id}', [UseCaseController::class, 'getUseCases']); ` <br /> 
` Route::post('/use_cases', [UseCaseController::class, 'setUCExecution']);` <br /> 
* aggiungere a route/web.php le seguenti linee
` use App\Http\Controllers\AnalytekUC\UseCaseViewController` <br />
` Route::get('/analytek', [UseCaseViewController::class, 'getUseCases']); ` <br /> 
` Route::get('/use_cases/{id}', [UseCaseController::class, 'getUCPlot']); ` <br /> 
* aggiungere a tutte le pagine i seguenti script nell'header <br /> 
`<script src="/js/Analytek/visit-time.js" type="module" language="javascript"></script>` <br /> 
`<script src="/js/Analytek/send-use-case.js" type="module" language="javascript"></script>`

## Configurare i casi d'uso
modificare il file storage/app/public/Analytek/UseCase.json per aggiungere i casi d'uso, per ognuno bisogna specificare: <br /> 
* il nome del caso d'uso
* il tempo massimo di esecuzione
* le pagine in cui deve passare separate da una virgola
