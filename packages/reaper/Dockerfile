FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY shared/ ./shared/
COPY packages/reaper/ ./packages/reaper/

RUN npm install --workspace=@relay/shared --workspace=@relay/reaper
RUN npm run build --workspace=@relay/shared
RUN npm run build --workspace=@relay/reaper

WORKDIR /app/packages/reaper

CMD ["node", "dist/index.js"]
