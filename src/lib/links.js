/**
 * Returns the index of the link containing "visit", or "website" in the name.
 * Case insensitive.
 *
 * @param {array} links links to search `Array({name: string, url: string})`
 */
function getWebsiteLinkIndex(links) {
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let upperName = link.name.toUpperCase();
    if (upperName.includes("VISIT") || upperName.includes("WEBSITE")) {
      return i;
    }
  }
}
/**
 * Returns the link object containing "visit", or "website" in the name.
 * Case insensitive.
 *
 * @param {array} links links to search `Array({name: string, url: string})`
 */
function getWebsiteLink(links) {
  return links[getWebsiteLinkIndex(links)];
}

/**
 * Returns the index of the link with a mailto:// url.
 *
 * @param {array} links links to search `Array({name: string, url: string})`
 */
function getEmailLinkIndex(links) {
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    if (link.url.includes("mailto")) {
      return i;
    }
  }
}

/**
 * Returns the link object with a mailto:// url.
 *
 * @param {array} links links to search `Array({name: string, url: string})`
 */
function getEmailLink(links) {
  return links[getEmailLinkIndex(links)];
}

/**
 * Returns all link object(s) with a http(s):// url that are not considered
 * the "Website Link" as determined by `getWebsiteLinkIndex()`.
 *
 * Adds additional `linkType` property to link containing one fo the following:
 * facebook, instagram, twitter, youtube, other
 *
 * @param {array} links links to search `Array({name: string, url: string})`
 */
function getWebLinks(links) {
  let matches = [];
  let ignoreLinkIndex = getWebsiteLinkIndex(links);

  for (let i = 0; i < links.length; i++) {
    let link = links[i];

    //Ignore Website Link
    if (i === ignoreLinkIndex) continue;

    if (link.url.includes("http")) {
      link.linkType = getWebLinkType(link);
      matches.push(link);
    }
  }

  return matches;
}

function getWebLinkType(link) {
  if (link.url.toLowerCase().includes("facebook")) {
    return "facebook";
  } else if (link.url.toLowerCase().includes("instagram")) {
    return "instagram";
  } else if (link.url.toLowerCase().includes("twitter")) {
    return "twitter";
  } else if (link.url.toLowerCase().includes("youtube") || link.url.toLowerCase().includes("youtu.be")) {
    return "youtube";
  } else {
    return "other";
  }
}

export default {
  getEmailLink,
  getEmailLinkIndex,
  getWebLinks,
  getWebsiteLink,
  getWebsiteLinkIndex
};
