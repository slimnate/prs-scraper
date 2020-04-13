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

## Contribution

Outside contribution is welcome, please check the [Github Project page](https://github.com/slimnate/prs-scraper/projects/1) for a complete view of all outstanding issues that need working, as well as in-progress and completed issues. Please create a branch named `issue-<issue #>` (eg. issue-1) and submit a pull request when your code is complete.

### Submitting issues

If you would like to submit a bug report or enhancement request, please submit an issue on github [here](https://github.com/slimnate/prs-scraper/issues)
