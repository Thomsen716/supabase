# Formål

Formålet med dette projekt er at lette udviklingen af React-applikationer med TypeScript og Vite samt med Supabase som database. Det er en minimal opsætning, der giver dig mulighed for hurtigt at komme i gang med at udvikle din applikation uden at skulle bekymre dig om konfigurationen.



# Opsætning

1. Klon dette projekt.
2. Installér node.js: [https://nodejs.org/en](https://nodejs.org/en).
3. Åbn en terminal og kør kommandoen `npm i`.  
5. Opret en database hos supabase: [https://supabase.com/](https://supabase.com/)
6. Opret en tom fil ved navn `.env` i roden af projektmappen.
7. Tilføj to linjer:

```
VITE_PROJECT_URL = "link til projektets url (kan findes på supabases hjemmeside for projektet)"
VITE_ANON_KEY = "Anonym nøgle (kan findes på supabases hjemmeside for projektet)"
```

8. Åbn en terminal og start projektet med `npm run dev`.
