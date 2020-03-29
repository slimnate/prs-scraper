/**
 * spent quite some time working on this test case, only to find that there is
 * a negligable difference in performance between new Fuse(...) and Fuse.createIndex(...)
 * performed frequently.
 * 
Results over  100  iterations:
=====================
method 1: avg =  0.19  min =  0  max =  2  (ms)
method 2: avg =  0.11  min =  0  max =  1  (ms)
times1:  [2,0,1,0,1,2,1,1,1,0,1,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]
times2:  [0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]
 */
const data = require("./data/libraries.json");
const Fuse = require('fuse.js/dist/fuse.dev');
const iterations = process.argv[2] || 100;

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

var Timer = function(name) {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            return time;
        }
    }
};

function method1() {
    new Fuse(data, options);
}

function method2() {
    Fuse.createIndex(["title", "description", "tags", "notes"], data);
}

var times1 = [];
var times2 = [];

do {
    var t = new Timer();
    method1();
    var time = t.stop();
    times1.push(time);
} while (times1.length < iterations);

do {
    var t = new Timer();
    method2();
    var time = t.stop();
    times2.push(time);
} while (times2.length < iterations);

var average1 = times1.reduce((prev, curr, i, arr) => {
    return prev + curr;
}, 0) / iterations;

console.log("Results over ", iterations, " iterations:\r\n=====================");

console.log("method 1: avg = ", average1, " min = ", Math.min(...times1), " max = ", Math.max(...times1), " (ms)");

var average2 = times2.reduce((prev, curr) => {
    return prev + curr;
}, 0) / iterations;

console.log("method 2: avg = ", average2, " min = ", Math.min(...times2), " max = ", Math.max(...times2), " (ms)");

console.log("times1: ", JSON.stringify(times1));
console.log("times2: ", JSON.stringify(times2));
