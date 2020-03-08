const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const url = "https://www.prsformusic.com/licences/using-production-music";

const SELECTORS = {
  dataUrls: "div.reference__data-item>a",
  richText: ".rich-text", //first will be title, second will be description
  imagePath: "image-module img",
  sidebar: ".links-sidebar-module__link"
};

const LINK_IGNORE_TEXT = [
  "Get a production music licence",
  "Get production music licence",
  "Using production music",
  "Using library music"
];

rp(url)
  .then(function(html) {
    let dataUrls = parseDataUrls(html);
    let workers = [];

    for (var i = 0; i < dataUrls.length; i++) {
      workers.push(createPageWorker(dataUrls[i]));
    }

    Promise.all(workers).then(values => {
      //write data to file
      fs.writeFileSync(
        path.resolve("./data/libraries.json"),
        JSON.stringify(values)
      );
    });
  })
  .catch(function(err) {
    console.log(err);
  });

/**
 * Parses data urls from given page HTML
 * @param {string} html HTML content of main page
 */
const parseDataUrls = function(html) {
  let $ = cheerio.load(html);
  let results = [];
  let i = 0;

  let items = $(SELECTORS.dataUrls);
  console.log(items.length, "items found");

  for (; i < items.length; i++) {
    results.push(items[i].attribs["href"]);
  }

  logPreview(results);

  return results;
};

/**
 * Returns a promise representing a single page data worker for the
 * specified url, for use with Promise.all
 *
 * @param {string} url URL to be loaded and parsed upon promise execution
 */
const createPageWorker = function(url) {
  return new Promise((resolve, reject) => {
    rp(url)
      .then(html => {
        resolve(parsePageData(html));
      })
      .catch(err => {
        console.log("error fetching page: ", url, err);
      });
  });
};

/**
 * Parses the data from a single page to return information about the
 * music library represented on the page
 * @param {string} html HTML content of Music Library page
 */
const parsePageData = function(html) {
  let $ = cheerio.load(html);
  let result = {
    title: "",
    logoUrl: "",
    description: "",
    links: []
  };
  let richText = $(SELECTORS.richText);
  //let logo = $(SELECTORS.mainContent);
  let links = $(SELECTORS.sidebar);

  //parse title and description
  result.title = $(richText[0])
    .text()
    .trim();
  result.description = $(richText[1])
    .text()
    .trim();

  //parse image TODO: not working
  //console.log(logo);
  //result.logoUrl = $(logo).attr("src").split("?")[0];

  //parse links
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let linkText = $(link).text();
    let href = link.attribs["href"];

    if (!ignoreLink(linkText)) {
      //console.log(linkText, " - added");
      result.links.push({
        name: linkText,
        url: href
      });
    } // else console.log(linkText, " - skipped");
  }
  //console.log(result);
  return result;
};

/**
 * Checks if a given Link Text string is contained in the list of ignored
 * link texts (`const LINK_IGNORE_TEXT` at top of file).
 * Ignores case and leading/trailing whitespace
 *
 * Returns true if the link is in the list and should be ignored, false otherwise.
 *
 * @param {string} text Link text to check
 */
const ignoreLink = function(text) {
  return LINK_IGNORE_TEXT.some(val => {
    return val.trim().toUpperCase() === text.trim().toUpperCase();
  });
};

const logPreview = function(arr, numItems) {
  numItems = numItems || 5;
  for (var i = 0; i < numItems; i++) {
    console.log(arr[i]);
  }
  console.log("...");
};
