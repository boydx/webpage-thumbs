const puppeteer = require('puppeteer');
const fs = require('fs');

const projs = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
let i = 0

for (proj in projs.features) {

    (async () => {
        try {

            let screenshotOptions = {
                path: `graphics/image${i}`,
                type: 'jpeg'
            }
    
            let x = String(projs.features[proj].properties.link)

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(x);
            page.setViewport({
                height: 1000,
                width: 1200
            })
            // await page.waitFor(10000)
            await page.screenshot(screenshotOptions);

            await browser.close();
            i++

        } 
        catch (error) {
            console.log(`dumbass ${error}`)
        }

    })();

}