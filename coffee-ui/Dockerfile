# ──────────────────────────
# Stage 1: Build
# ──────────────────────────
FROM node:18-alpine AS builder

# set working directory
WORKDIR /app

ARG REACT_APP_API_BASE_URL
ARG REACT_APP_APIM_SUBSCRIPTION_KEY
ARG REACT_APP_ASGARDEO_CLIENT_ID
ARG REACT_APP_ASGARDEO_BASE_URL
ARG REACT_APP_RESOURCE_SERVER_URL
ARG REACT_APP_SITE_URL
ARG REACT_APP_SIGN_IN_REDIRECT_URL
ARG REACT_APP_SIGN_OUT_REDIRECT_URL

ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
ENV REACT_APP_APIM_SUBSCRIPTION_KEY=${REACT_APP_APIM_SUBSCRIPTION_KEY}
ENV REACT_APP_ASGARDEO_CLIENT_ID=${REACT_APP_ASGARDEO_CLIENT_ID}
ENV REACT_APP_ASGARDEO_BASE_URL=${REACT_APP_ASGARDEO_BASE_URL}
ENV REACT_APP_RESOURCE_SERVER_URL=${REACT_APP_RESOURCE_SERVER_URL}
ENV REACT_APP_SITE_URL=${REACT_APP_SITE_URL}
ENV REACT_APP_SIGN_IN_REDIRECT_URL=${REACT_APP_SIGN_IN_REDIRECT_URL}
ENV REACT_APP_SIGN_OUT_REDIRECT_URL=${REACT_APP_SIGN_OUT_REDIRECT_URL}
ENV DISABLE_ESLINT_PLUGIN=true

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