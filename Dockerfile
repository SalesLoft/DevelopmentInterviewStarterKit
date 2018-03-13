FROM ruby:2.4.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY emfile.lock /app/Gemfile.lock
RUN bundle install

RUN mkdir /client
WORKDIR /client
RUN mkdir src
RUN mkdir dist
COPY package.json package-lock.json .

COPY package.json package-lock.json /src/

COPY . /app
