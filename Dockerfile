# Step 1: Build the Next.js app
FROM node:22 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Run in a lighter container
FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
# optional
COPY --from=builder /app/next.config.js* ./

EXPOSE 3000

CMD ["npm", "start"]

