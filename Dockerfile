#under test
# =========================
# Base image
# =========================
FROM node:20-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# =========================
# Development stage
# =========================
FROM base AS development

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]


# =========================
# Production build stage
# =========================
FROM base AS build

RUN npm run build


# =========================
# Production runtime
# =========================
FROM nginx:alpine AS production

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]