# Analytek
Un modulo da aggiungere a un progetto laravel dei cookie analitici che permettono di registrare il percorso e il tempo per i diversi casi d'uso.

## Come usarlo
* Scaricare e aggiungere il modulo al progetto laravel <br /> 
* fare la migrazione e il seed <br /> 
` php artisan migrate:refresh --path=/database/migrations/2022_12_16_000000_create_analytek_table.php ` <br /> 
` php artisan db:seed --class=UseCaseSeeder ` <br /> 
* aggiungere a route/api.php le seguenti linee <br /> 
` use App\Http\Controllers\AnalytekUC\UCAnalytekController` <br />
` Route::get('/use_cases', [UCAnalytekController::class, 'getUseCases']); ` <br /> 
` Route::post('/use_cases', [UCAnalytekController::class, 'setPerfomanceData']);` <br /> 
* aggiungere a tutte le pagine i seguenti script nell'header <br /> 
`<script src="/js/Analytek/visit-time.js" type="module" language="javascript"></script>` <br /> 
`<script src="/js/Analytek/send-use-case.js" type="module" language="javascript"></script>`

## Configurare i casi d'uso
modificare il file storage/app/public/Analytek/UseCase.json per aggiungere i casi d'uso, per ognuno bisogna specificare: <br /> 
* il nome del caso d'uso
* il tempo massimo
* le pagine in cui deve passare
