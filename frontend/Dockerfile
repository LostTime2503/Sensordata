FROM node:20

WORKDIR /app

# Kopier package.json og package-lock.json først
COPY package*.json ./

# Installer dependencies
RUN npm install

# Kopier resten av prosjektet
COPY . .

# CRA kjører på port 3000
EXPOSE 3000

# Start dev-server
CMD ["npm", "start"]
