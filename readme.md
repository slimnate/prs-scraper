# PRS Scraper - Production Music Library Database

This NodeJS package is designed to scrape the [PRS production music library](https://www.prsformusic.com/licences/using-production-music) for affiliated libraries, and then serve that data in an easy to use web app, augmenting the listings with useful features and tools that musicians can use to find the libraries that are right for them.

## Getting Started

### Scraper
```node scrape.js```

Run scraper service. Data retrieved will be written to `./data/libraries.json`

### Server

 The Server is built with Vue.js and allows for searching of library data, and allows for quick, easy viewing of each libraries general info and related links.

### Development

```npm run serve```

Runs the server in development mode with live-reload enabled. Access site at:
[`http://localhost:8080/`](http://localhost:8080/)

##### Production

```npm run build```

Runs the server in production mode

## Future Features & Functionality
- Find a better way to auto-truncate libraries `shortDescription`
- Add notes and tags to each library
- Add library to favorites
- Filter by favorites/tags
- Search for libraries (fields: name, description, notes, tags)