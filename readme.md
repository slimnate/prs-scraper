# PRS Scraper - Production Music Library Database

This NodeJS package is designed to scrape the [PRS production music library](https://www.prsformusic.com/licences/using-production-music) for affiliated libraries, and then serve that data in an easy to use web app, augmenting the listings with useful features and tools that musicians can use to find the libraries that are right for them.

## Getting Started

### Scraper

```node scrape.js <options>```

Options:
- `raw` - export data without the extra fields needed for use by the web application. Use this option to ONLY include the data scraped directly from the website.


Run scraper service. Data retrieved will be written to `./data/libraries.json`

### Server

 The Server is built with Vue.js and allows for searching of library data, and allows for quick, easy viewing of each libraries general info and related links.

#### Development

```npm run serve```

Runs the server in development mode with live-reload enabled. Access site at:
[`http://localhost:8080/`](http://localhost:8080/)

##### Production

```npm run build```

Runs the server in production mode

## Future Features & Functionality
- Find a better way to auto-truncate libraries `shortDescription`
- ~~Add notes and tags to each library~~
- ~~Add library to favorites~~
- ~~Filter by favorites/tags~~
- Add color-coding to tag badges for improved usability
- Add chips to tag selector https://quasar.dev/vue-components/select#Example--Chips-as-display-value
- Make tag filter selector outlined to match search field
- Add badges to notes/tags tab button
- Add Notify messsages upon actions performed
- Add waiting spinners
- Scroll note/tag areas if they get too tall
- Move store action definitions to separate files for individual feature sets (notes, tags, etc)