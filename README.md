# Hackathon Organization Tool

Basic (for now) web application for hosting and managing hackathons and game jams.

## The Stack

Front End: Javascript + React

Back End: Golang + Gin Framework

Database: RethinkDB

## Generate SSL Certificates
You'll need to generate SSL certificates in `data/nginx/certs` before using the application.
This allows the web application to use SSL.

TODO: A PYTHON SCRIPT CAN PROBABLY BE PROVIDED TO DO THIS.

### Mac Instructions
```bash
# install mkcert
current_dir = $CWD
brew install mkcert

# Go to directory
cd data/nginx/certs

# Generate certificates
mkcert -key-file ssl.key -cert-file ssl.crt hackathon.local
cd $current_dir
```

## TO RUN

### Production
The suggested way to run the application is to change 

`DB_USE_HOST=1` in the `.env` file to `DB_USE_HOST=0` and run

```bash
docker-compose up -d
```

### Development

#### Web Application

The NPM run script uses SSL to allow Discord logins. You'll need to add these lines to your environment:

```
export SSL_CRT_FILE=/path/to/repo/hackathon/data/nginx/certs/ssl.crt
export SSL_KEY_FILE=/path/to/repo/hackathon/data/nginx/certs/ssl.key
```
#### Database
```
docker-compose up -d rethinkdb
```

This will set up the database container.

#### Backend
Set `DB_USE_HOST=1` in the .env file and run.

You should then run the `main.go` file from your preferred IDE, ensuring that the `.env`
file is being sampled by your run configuration. (GoLand has an EnvFile plugin which works well for this.)

#### Setting up .env file in GoLand
To use the `.env` file in GoLand, you'll need the `EnvFile` plugin and need to set up your run configuration to 
use the file.

Install plugin in `File->Setting->Plugins`
![](docs/images/EnvFilePlugin.png)

Set up run configuration:
![](docs/images/EnvFileRunConfiguration.png)