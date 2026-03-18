FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY shared/ ./shared/
COPY packages/worker/ ./packages/worker/

RUN npm install --workspace=@relay/shared --workspace=@relay/worker
RUN npm run build --workspace=@relay/shared
RUN npm run build --workspace=@relay/worker

WORKDIR /app/packages/worker

CMD ["node", "dist/index.js"]
