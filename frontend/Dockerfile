# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json pnpm-lock.yaml ./

# ✅ Install pnpm first
RUN npm install -g pnpm

# ✅ Now install dependencies
RUN pnpm install

# Copy rest of the code
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start dev server (or "start" for prod)
CMD ["pnpm", "dev"]
