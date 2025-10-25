# -------- Stage 1: Build client --------
FROM node:20-alpine AS builder
WORKDIR /app

# copy package files first to leverage caching
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# copy rest of client and build
COPY client/ ./
RUN npm run build

# -------- Stage 2: Setup server --------
FROM node:20-alpine AS runner
WORKDIR /app

# install server dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --production --legacy-peer-deps || npm install --production --legacy-peer-deps

# copy server source
COPY server/ /app/server/

# copy built client files into expected path for server
COPY --from=builder /app/client/dist /app/client/dist

# set environment and port
ENV PORT=4000
EXPOSE 4000

# default command
WORKDIR /app/server
CMD ["node", "index.js"]
