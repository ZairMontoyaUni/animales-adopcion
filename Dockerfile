FROM node:20

WORKDIR /app

# Install dependencies (including dev for start:dev)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
