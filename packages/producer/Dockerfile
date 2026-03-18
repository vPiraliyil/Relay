FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY shared/ ./shared/
COPY packages/producer/ ./packages/producer/

RUN npm install --workspace=@relay/shared --workspace=@relay/producer
RUN npm run build --workspace=@relay/shared
RUN npm run build --workspace=@relay/producer

WORKDIR /app/packages/producer

EXPOSE 3000

CMD ["node", "dist/index.js"]
