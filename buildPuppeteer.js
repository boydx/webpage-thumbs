// Create a GeoJSON and thumbnails of project web pages
const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
// var csv2geojson = require('csv2geojson');

// Load list of projects
const projects = JSON.parse(fs.readFileSync('input/list.json', 'utf8'));

// Set local variables
const fields = "title, info, author, link, y, x, thumb"
let imageName = "",
    fileName = ""

// Create CSVfile with field names
fs.writeFile('output/projects.csv', fields, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;
});

// Loop through projects and build record
for (p in projects.publish) {
  axios.get(projects.publish[p])
    .then((response) => {
      let res = response.data
      if (res.link != undefined) {
        imageName = res.title.slice(0, 12).replace(/ /g, "-")
        let number = Math.floor((Math.random() * 1000) + 1);
        fileName = `graphics/${imageName}${number}.jpg`
        makeThumbs(res.link, fileName)
      } else {
        fileName = "graphics/nmp-project.jpg"
      }
      buildString(res.title, res.info, res.author, res.link, res.coordinates[0], res.coordinates[1], fileName)
      console.log(fileName)

    })
    .catch((error) => {
      // handle error
      console.log(`${error} is likely a 404....`);
    })
}

// Export to geojson
// Load list of projects
// const projectsCSV = fs.readFileSync('projects.csv', 'utf8');
// const geojson = csv2geojson.csv2geojson(projectsCSV, {
//   latfield: 'y',
//   lonfield: 'x',
//   delimiter: ','
// }, function(err, data) {
// });

// fs.writeFile('projects.geojson', geojson, (err) => {
//   // throws an error, you could also catch it here
//   if (err) throw err;
// });

// Functions

// Build string for each record
function buildString (t, i, a, l, x, y, f) {
  if (l == undefined){
    f = "graphics/nmp-project.jpg"
    l = "https://newmapsplus.as.uky.edu"
  } 
  if (a == undefined) {
    a = "A mighty mapper!"
  }
  let content = `
  "${t}", "${i}", "${a}", "${l}", ${x}, ${y}, "${f}"`
  fs.appendFile('output/projects.csv',
        content,
        (err) => {
          if (err) throw err;
          // console.log(`Added: ${content}`);
        });
}

// Build thumbnail
function makeThumbs(url, name) {
  (async () => {
    try {
      // How to sanitize link?
      if (url.includes("https://") && url.includes(".github.io/")) {
        let screenshotOptions = {
          path: `output/${name}`,
          type: 'jpeg'
        }
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        page.setViewport({
          height: 1000,
          width: 1200
        })
        // await page.waitFor(10000)
        await page.screenshot(screenshotOptions);
        await browser.close();
      }

    } catch (error) {
      console.log(`dumbass ${error}`)
    }

  })();

}
