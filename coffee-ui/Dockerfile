# ──────────────────────────
# Stage 1: Build
# ──────────────────────────
FROM node:18-alpine AS builder

# set working directory
WORKDIR /app

# install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm ci; \
  fi

# copy source & build
COPY . .
RUN npm run build



# ──────────────────────────
# Stage 2: Serve
# ──────────────────────────
FROM nginx:stable-alpine

# copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# (Optional) override default conf to support client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]