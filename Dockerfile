FROM node:9.4.0

WORKDIR /usr/app
COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000
EXPOSE 35729
EXPOSE 9009

ENTRYPOINT [ "/bin/bash", "run.sh" ]
CMD [ "storybook" ]
