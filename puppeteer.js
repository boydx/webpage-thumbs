const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const projects = JSON.parse(fs.readFileSync('list.json', 'utf8'));

// Set local var
let i = 0
let projectList = {
  "features": [
  { "type": "Feature", 
     "properties": { 
       "title": "", 
       "info": "", 
       "author": "", 
       "link": ""
      }, 
       "geometry": { 
         "type": "Point", 
         "coordinates": [ -94.0, 36.0 ] 
        } 
      }
  ]}

for (p in projects.publish) {
    console.log(projects.publish[p])

    axios.get(projects.publish[p])
    .then(function (response) {
        // handle success
        
        if (response.data) {
          console.log(response.data, i);
          projectList.features[i].type = "Feature"
          projectList.features[i].properties.title = response.data.title
          projectList.features[i].properties.info = response.data.info
          projectList.features[i].properties.author = response.data.author
          projectList.features[i].properties.link = response.data.link
          projectList.features[i].geometry.type = "Point"
          projectList.features[i].geometry.coordinates = [response.data.coordinates[1], response.data.coordinates[0]]
        }
        // projectList.append(response.data.link)
      }).then(
        i++)
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .then(function () {
        // always executed
      });
    

}

for (l in projectList) {

  console.log(projectList[l])

}



// function (url) {
//     // make thumbs
// }

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