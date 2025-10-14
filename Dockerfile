# Usa l'immagine ufficiale di Bun
FROM oven/bun:1.1.38

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di dipendenze
COPY package.json bun.lock* ./

# Installa solo le dipendenze di produzione
RUN bun install --production

# Copia il codice sorgente
COPY . .

# Esponi la porta (verrà sovrascritta dalla variabile PORT di Render)
EXPOSE 3000

# Comando di start
CMD ["bun", "index.ts"]

