# ---- Build & Export (Next.js) ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || npm i

# Copy source
COPY . .

# Build (Next.js with output: "export" will create /out automatically)
RUN npm run build

# ---- Nginx to serve the static site ----
FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy exported site
COPY --from=builder /app/out/ ./

# Replace default Nginx site config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
