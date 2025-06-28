# استفاده از Node.js نسخه LTS
FROM node:20-alpine AS base

# نصب dependencies مورد نیاز برای Prisma و PM2
RUN apk add --no-cache libc6-compat openssl

# تنظیم working directory
WORKDIR /app

# کپی کردن package files
COPY package*.json ./
COPY prisma ./prisma/

# نصب dependencies
RUN npm ci --legacy-peer-deps --ignore-scripts

# مرحله Build
FROM base AS builder

# کپی کردن کل سورس کد
COPY . .

# تولید Prisma client
RUN npx prisma generate

# ساخت پروژه
RUN npm run build

# مرحله Production
FROM node:20-alpine AS production

# نصب dependencies مورد نیاز
RUN apk add --no-cache libc6-compat openssl

# ایجاد user غیر root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

WORKDIR /app

# کپی کردن package files
COPY package*.json ./
COPY prisma ./prisma/

# نصب فقط production dependencies به همراه PM2
RUN npm ci --legacy-peer-deps --only=production --ignore-scripts && \
    npm install pm2 -g && \
    npm cache clean --force

# کپی کردن فایل‌های build شده
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# کپی کردن ecosystem.config.js اگر استفاده می‌کنید
# COPY ecosystem.config.js ./

# تنظیم user
USER nestjs

# expose کردن port
EXPOSE 3005

# تنظیم environment
ENV NODE_ENV=production

# اجرای برنامه با pm2
CMD ["pm2-runtime", "dist/main.js"]
