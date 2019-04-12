const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');


const projects = JSON.parse(fs.readFileSync('list.json', 'utf8'));
let i = 0

for (p in projects.publish) {
    console.log(projects.publish[p])

    axios.get(projects.publish[p])
    .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    

}

function (url) {
    // make thumbs
}

// for (proj in projs.features) {

//     (async () => {
//         try {

//             let screenshotOptions = {
//                 path: `graphics/image${i}`,
//                 type: 'jpeg'
//             }
    
//             let x = String(projs.features[proj].properties.link)

//             const browser = await puppeteer.launch();
//             const page = await browser.newPage();
//             await page.goto(x);
//             page.setViewport({
//                 height: 1000,
//                 width: 1200
//             })
//             // await page.waitFor(10000)
//             await page.screenshot(screenshotOptions);

//             await browser.close();
//             i++

//         } 
//         catch (error) {
//             console.log(`dumbass ${error}`)
//         }

//     })();

// }
//