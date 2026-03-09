```markdown
# Sensorprosjekt – Docker, SQL og visualisering

Dette prosjektet er et fullstack‑system som viser sensordata (temperatur) hentet fra en MySQL‑database. Systemet består av tre containere:

- **MySQL‑database** med ferdige sensorverdier  
- **Node.js API** som henter data fra databasen  
- **React‑frontend** som viser graf og har enkel innlogging  
- Alt kjører i Docker via `docker-compose`

---

## 🚀 Hvordan kjøre prosjektet

### 1. Klon repoet
```bash
git clone https://github.com/LostTime2503/SensordataFullstack
```

### 2. Gå inn i prosjektmappen
```bash
cd SensordataFullstack
```

### 3. Start hele systemet
```bash
docker compose up --build
```

### 4. Åpne i nettleser
Frontend: http://localhost:3000  
API: http://localhost:3001  

MySQL kjører internt i Docker og trenger ikke åpnes manuelt.

---

## 📁 Prosjektstruktur
```text
/api        → Node.js backend (Express + MySQL)
/frontend   → React frontend (Chart.js + innlogging)
/db         → SQL-filer som initialiserer databasen
docker-compose.yml
```

---

## 📊 Hva prosjektet gjør

- Leser temperaturdata fra databasen  
- Viser graf i frontend (Chart.js)  
- Har registrering og innlogging med bcrypt + JWT  
- Alt kjører i containere for enkel oppstart og stabilitet  

---

## 🐳 Hvorfor Docker brukes

Docker gjør prosjektet enkelt å kjøre på hvilken som helst maskin uten å installere MySQL, Node eller andre avhengigheter.  
Det er også relevant for lærlingplassen min hos Norsk Tipping, som bruker containere i produksjon.

---

## 🛑 Stoppe prosjektet
```bash
docker compose down
```
```
