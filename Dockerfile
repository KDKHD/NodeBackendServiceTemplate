# Stage 1
FROM node:16-alpine as base

WORKDIR /usr/app

# Install dependencies
COPY package*.json ./
RUN npm ci

COPY . .

# Build the app
RUN npm run build

# Stage 2
FROM node:16-alpine

# Setup
RUN apk add dumb-init
ENV NODE_ENV production

WORKDIR /usr/app
COPY package*.json ./

# Install prod dependencies
RUN npm ci --only=production
RUN npm prune --production


COPY --from=base /usr/app/dist ./dist

# Copy required files
COPY ./tsconfig*.json ./
COPY ./paths.json ./
COPY ./.env* ./

USER node
CMD TS_NODE_PROJECT=tsconfig.production.json dumb-init node -r tsconfig-paths/register dist/app.js
