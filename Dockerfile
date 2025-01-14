# Step 1: Set base image
FROM node:18 AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the source code
COPY . .

# Step 6: Add environment variable for DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Step 7: Run Prisma migrations (to ensure your database schema is up-to-date)
RUN npx prisma generate
RUN npx prisma migrate deploy

# Step 8: Build the TypeScript code into the dist folder
RUN npm run build

# Step 9: Set the environment variable for production
ENV NODE_ENV=production

# Step 10: Expose the port the app will run on
EXPOSE 3000

# Step 11: Start the app
CMD ["npm", "start"]



