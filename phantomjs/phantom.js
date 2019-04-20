const webshot = require('webshot')
const fs = require('fs');
const phantom = require('phantom');

const projs = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
let i = 0
const options = {
    // phantomPath: "/Volumes/B/_repos/_boydx/phantomjs/bin/phantomjs",
    windowSize: {
        width: 1200,
        height: 1000
    },
    shotSize: {
        width: 1200,
        height: 1000
      },
    userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
        + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
    renderDelay: 60000
};

for (proj in projs.features) {
    
(async function() {
    let x = String(projs.features[proj].properties.link)
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open(x);
    console.log(status);

    const content = await page.property('content');
    // await page.property('viewportSize', { width: 1024, height: 600 });
    // await page.render(`graphics/image${i}.jpg`);

    webshot (x, `graphics/image${i}.jpg`, options, (err) => {
        
        // screenshot now saved to google.png
    })

    i++

    await instance.exit();
}());


    
    
}
// const request = require('request');

// axios.get("https://brucehaupt.github.io/my-final-project-repo/")
// .then(console.log("done"))


    
        
    // console.log(typeof(x))
    // console.log(x.slice(7,15))
    // console.log(String(x).slice(7,15))
    






// var options = {
//     phantomPath: "/Volumes/B/_repos/_boydx/phantomjs/bin/phantomjs",
//     windowSize: {width: 400,
//     height: 600}
// };

// webshot('outrageGIS.com', image , options, (err) => {
//     // screenshot now saved to google.png
// });

// console.log(projs)

// sharp(image)
//   .toFile('graphics/output.jpg', (err, info) => { });