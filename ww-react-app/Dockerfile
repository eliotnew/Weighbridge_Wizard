FROM node:21

WORKDIR /ww-react-app

# Copies and installs the dependencies
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# port
EXPOSE 5173

# Entry point
CMD ["npm", "run", "dev"]
