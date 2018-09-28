# SalesLoft Development Interview Starter Kit

This application is a jumping off point for the SalesLoft Development Interview,
its designed to cut out boilerplate so you can get straight to coding.

**For full-stack submissions**: Please build both a Rails back-end and a React front-end. Think carefully about the responsibilities of each component.

Included in the package.

- Rails 5 Application
- Webpack Front-end build system
- React
- Redux

## Getting Started

### Running natively

1.) Make sure your ruby environment is at least 2.4.1
```
ruby --version
```
2.) Make sure your node version is above 8.5.0
```
node --version
```
3.) bundle install
```
gem install bundle
bundle install
```
4.) npm install
```
npm install
```
5.) Create and migrate Sqlite Databases
```
bundle exec rake db:create && bundle exec rake db:migrate
```
6.) Copy the .env.sample to .env and fill out the values
```
cp .env.sample .env
```
7.) Start the development server
```
bundle exec foreman start
```
8.) Navigate to localhost:5000

