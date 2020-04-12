import Fuse from "fuse.js";

var fuse = null;

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 10000, //large distance to ensure we get matches towards the end of long descriptions
  keys: [
    {
      name: "title",
      weight: 0.3
    },
    {
      name: "description",
      weight: 0.2
    },
    {
      name: "tags",
      weight: 0.2
    },
    {
      name: "notes",
      weight: 0.2
    }
  ]
};

/**
 * Normalizes an array of searh results into a format matching the datas initial format.
 * @param {Array<Fuse} searchResults search results object to normalize
 */
function normalize(searchResults) {
  return searchResults.reduce((res, curr) => {
    res.push(curr.item);
    return res;
  }, []);
}

export default {
  init(list) {
    fuse = new Fuse(list, options);
  },
  search(text) {
    let res = fuse.search(text);
    res = normalize(res);
    return res;
  }
};
