FROM node:20
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "run", "start"]
