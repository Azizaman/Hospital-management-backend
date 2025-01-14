# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend code into the container
COPY . .

# Step 6: Run Prisma migrations (to ensure your database schema is up-to-date)
RUN npx prisma migrate deploy

# Step 7: Build the TypeScript code into the dist folder
RUN npm run build

# Step 8: Expose the app on port 3000
EXPOSE 3000

# Step 9: Run the server using Node.js
CMD ["node", "dist/server.js"]
