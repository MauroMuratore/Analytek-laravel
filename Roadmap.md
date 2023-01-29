# Roadmap Analytek
Current version: v0.1.3
## v0.1.1
- [x] Far (ri)partire il timer di _visit-time.js_ quando viene selezionato il caso d'uso
- [x] Creare file di installazione
- [x] Gestire le dipendenze

## v0.1.2
- [x] refactoring dei nomi per dividere la parte casi d'uso a quella analitica
- [x] gestire lato client più pagine per i casi d'uso
- [x] la registrazione dei tempi su una pagina avviene quando cambia window.location, sono solo quando viene clickato un anchor

## v0.1.3
- [x] creare la view per i casi d'uso con i diversi grafici
- [x] aggiungere descrizione ai casi d'uso 

## v0.1.4
- [ ] fare grafici con i parametri dell'utente?? forse meglio solo dei filtri

## v0.2
- [ ] creare la parte analitica
- [ ] Mandare il tempo trascorso in una pagina anche senza caso d'uso
- [ ] Configurare *Analytek* per funzionare in *modalità caso d'uso* o in *modalità analisi navigazione*

## v0.3
- [ ] passare da _perfomance_data_ _measure_interaction_ in modo da non misurare più solo quanto tempo passa sulla pagina, ma anche dove nella pagina si passa quel tempo e le interazioni con gli elementi

## v0.4
- [ ] Creare sezione per il report
- [ ] Aggiungere timestamp* a _performance_data_
*In conformità con il gdpr:
* registrare un id sessione che non si riconducibile all'utente neanche attraverso i log apache
* far aggiungere la richiesta del consenso per i cookie analitici e gestirlo
* fare dei record aggregati (!!) struttura

## v0.5
- [ ] Aggiungere versione API
- [ ] Criptare i cookie e gestire chiave pubblica e privata

. <br />
. <br />
. <br />

## 1.0
- [ ] creare modula laravel
