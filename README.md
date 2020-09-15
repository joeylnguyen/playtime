# PlayTime

> A web application that allows users to quickly build Spotify playlists based on play duration. This was built using React, Node/Express, and Spotify Web API.

> See it live [here](https://spotify-playtime.herokuapp.com)!

## Table of Contents

1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Run Application](#run-application)
1. [Development](#development)

### Installing Dependencies

From within the root directory:

```sh
npm install
```
## Requirements

### Oauth Backend

This application utilizes an Oauth flow in order to get user permission for editing and creating playlists. Thus, you will need to have a backend running with the proper Spotify developer credentials in order to have everything working. I used MPJ's template here: https://github.com/mpj/oauth-bridge-template.

### Spotify Developer Credentials

You will need a Spotify Client ID and Spotify Secret Key in order to properly setup the Oauth flow.

Visit https://developer.spotify.com/ for more details on how to set up app credentials.

## Run Application

### Start app in production mode

```sh
npm start
```

## Development

### Start app in development mode

```sh
npm run dev
```
