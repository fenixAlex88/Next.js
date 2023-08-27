FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --legacy-peer-deps
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production --legacy-peer-deps
CMD [ "npm", "start" ]
EXPOSE 3000