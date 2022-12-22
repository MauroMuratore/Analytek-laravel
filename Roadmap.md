# Roadmap Analytek
Current version: v0.1
## v0.1.1
- [ ] Far (ri)partire il timer di _visit-time.js_ quando viene selezionato il caso d'uso
- [ ] Creare file di installazione
- [ ] Gestire le dipendenze
## v0.1.2
- [ ] Aggiungere versione API
- [ ] Criptare i cookie e gestire chiave pubblica e privata
## v0.2
- [ ] Mandare il tempo trascorso in una pagina anche senza caso d'uso
- [ ] Configurare *Analytek* per funzionare in *modalità caso d'uso* o in *modalità analisi navigazione*
## v0.3
- [ ] Aggiungere timestamp* a _performance_data_
- [ ] Creare sezione per il report
## v0.4
- [ ] passare da _perfomance_data_ _measure_interaction_ in modo da non misurare più solo quanto tempo passa sulla pagina, ma anche dove nella pagina si passa quel tempo e le interazioni con gli elementi

*In conformità con il gdpr:
* registrare un id sessione che non si riconducibile all'utente neanche attraverso i log apache
* far aggiungere la richiesta del consenso per i cookie analitici e gestirlo
* fare dei record aggregati (!!) struttura