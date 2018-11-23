var counter = 0;
function getImages() {
    var request = require('request');
    var url = require('url');
    var cheerio = require('cheerio');
    path = require('path')
    var fs = require('fs');

    request("https://www.oregonlive.com/roadreport/index.ssf/2008/12/i5cams.html", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body)
            imgs = $('img').toArray()
            console.log("\nDownloading 1st...")
            imgs.forEach(function (img) {
                img_url = img.attribs.src
                if (/^https?:\/\//.test(img_url)) {
                    img_name = path.basename(img_url)
                    name = counter + "__" + img_name
                    process.stdout.write(".");
                    request(img_url).pipe(fs.createWriteStream(path.join('Datasets', name)))
                }
            })
            console.log("Done!")
        }
    })
 
    request("https://www.portlandoregon.gov/transportation/75625", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body)
            imgs = $('img').toArray()
            console.log("\nDownloading 2nd...")
            imgs.forEach(function (img) {
                img_url = img.attribs.src
                if (/^https?:\/\//.test(img_url)) {
                    img_name = path.basename(img_url)
                    name = counter + "__" + img_name
                    process.stdout.write(".");
                    request(img_url).pipe(fs.createWriteStream(path.join('Datasets', name)))
                }
            })
            console.log("Done!")
        }
        counter++;
    })
}
getImages();
setInterval(getImages, 1800000);
