FROM node:20-alpine

WORKDIR /app

COPY packages/dashboard/ ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
