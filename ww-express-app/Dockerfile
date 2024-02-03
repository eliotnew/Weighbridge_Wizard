FROM node:16
# set the working directory in the container
WORKDIR /ww-express-app

# Copies and installs the dependencies
COPY package*.json ./
RUN npm install
COPY . .

# My Express server runs on port 3001, and my react app runs on 3000
EXPOSE 3001

# Define the command to run your application
CMD ["node", "server.js"]
