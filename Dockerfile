################################
# Stage 1 -- Build and Install #
################################
FROM node:12-alpine as installer
WORKDIR /home/app

RUN apk update && apk add curl bash

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# Copy Dependencies
COPY . .

# Run Install/Build
RUN npm i && npm run build

# remove development dependencies
RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

################################
# Stage 2 -- Build and Install #
################################
FROM alpine:3.12
WORKDIR /home/app

# Copy the binary from the builder image
COPY --from=installer /home/app/node_modules /home/app/node_modules
COPY --from=installer /home/app/build/ /home/app/

# Install production dependencies
RUN apk --update add --no-cache nodejs nodejs-npm

# Create the ENV variables
ENV HOST="0.0.0.0"
ENV PORT=4000

EXPOSE 4000

# Set the Entrypoint
ENTRYPOINT ["node", "/home/app/main.js" ]