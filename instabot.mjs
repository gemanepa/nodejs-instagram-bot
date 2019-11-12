import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import setHashtags from './src/setHashtags.mjs';
import loginProcess from './src/loginProcess.mjs'
import selectors from './settings/selectors.json';
import shuffle from './utils/shuffle.mjs';
import consoleMessage from './utils/consoleMessage.mjs';

dotenv.config();

// if(process.env.SOCIALMEDIA === 'instagram') { instaBot() }
// else if (process.env.SOCIALMEDIA === 'twitter') { twitterBot() }


function publicationFinder(hashtag, page, selector) {
    console.log('hashtag: ', hashtag);
    console.log('selector: ', selector);
    await page.goto('https://www.instagram.com/explore/tags/' + hashtags + '/?hl=en');
    consoleMessage('log', '\n===> hashtag search: ' + hashtags)

    // const divsTree = [
    //     [1, 2, 3, 4],
    //     [1, 2, 3, 4],
    //     [1, 2, 3, 4],
    //     [1, 2, 3, 4]
    // ]

    // divsTree.forEach((number, index) => )

    // Loop through the latest 9 posts
    for (let r = 1; r < 4; r++) {
        for (let c = 1; c < 4; c++) {

            //Try to select post, wait, if successful continue
            let br = false;
            await page.click('section > main > article > div:nth-child(3) > div > div:nth-child(' + r + ') > div:nth-child(' + c +') > a').catch(() => {
                br = true;
            });
            await page.waitFor(5250 + Math.floor(Math.random() * 250));
            if (br) continue;

            // Get post info
            let hasEmptyHeart = await page.$(selector.greyHeartIcon);

            let username = await page.evaluate(x => {
                let element = document.querySelector(x);
                return Promise.resolve(element ? element.innerHTML : '');
            }, selector.username);

            let followStatus = await page.evaluate(x => {
                let element = document.querySelector(x);
                return Promise.resolve(element ? element.innerHTML : '');
            }, selector.followLink);

            let hasLikeButton = await page.evaluate(() => {
                let element = document.querySelector('span.fr66n > button');
                return Promise.resolve(element ? element.innerHTML : undefined);
            })

            let hasCloseButton = await page.evaluate(() => {
                let element = document.querySelector(selector.closeBtn);
                console.log(element)
                return Promise.resolve(element ? element.innerHTML : undefined);
            })

            consoleMessage('log', '---> Evaluating post from ' + username)

            // Decide to like post
            if (hasEmptyHeart && hasLikeButton && Math.random() < 0.5) {
                await page.click(selector.likeBtn);
                let blocked = await page.evaluate(() => {
                    let element = document.querySelector('._2dDPU');
                    console.log(element)
                    return Promise.resolve(element ? element : undefined);
                })
                if(blocked){
                    consoleMessage('error','USER IS BLOCKED')
                    process.exit()
                } else {
                   consoleMessage('log', '---> like for ' + username)
                    await page.waitFor(15000 + Math.floor(Math.random() * 5000));
                }
            }

            // Decide to follow user
            if (followStatus === 'Follow' && Math.random() < 0.25) {
                await page.click(selector.follow_link).then(() => {
                    consoleMessage('log', '---> follow for ' + username)
                    return page.waitFor(15000 + Math.floor(Math.random() * 5000));
                }).catch(() => {
                    consoleMessage('log', '---> Already following ' + username)
                });
            }

            // Close post
            if(hasCloseButton){
                await page.click('button.ckWGn').catch(() => consoleMessage('error', ':::> Error closing post'))
            }
        }
    }
}


async function instaBot() {
    consoleMessage('log', 'Starting InstaBot')
    const hashtagsArray = setHashtags();

    const { publication } = selectors;

    // set up Puppeteer
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await loginProcess(page, selectors);

   try {
    // Loop through shuffled hashtags
    let hashtags = shuffle(hashtagsArray);
    consoleMessage('log', 'Hashtags shuffle activated.')

    hashtags.forEach(publicationFinder(element, page, publication));
    hashtags.forEach(hashtag => publicationFinder(hashtag, page, publication));

    // Search for hashtags
    /*for (let hl = 0; hl < hashtags.length; hl++) {
        await page.goto('https://www.instagram.com/explore/tags/' + hashtags[hl] + '/?hl=en');
        consoleMessage('log', '\n===> hashtag search: ' + hashtags[hl])

        // Loop through the latest 9 posts
        for (let r = 1; r < 4; r++) {
            for (let c = 1; c < 4; c++) {

                //Try to select post, wait, if successful continue
                let br = false;
                await page.click('section > main > article > div:nth-child(3) > div > div:nth-child(' + r + ') > div:nth-child(' + c +') > a').catch(() => {
                    br = true;
                });
                await page.waitFor(5250 + Math.floor(Math.random() * 250));
                if (br) continue;

                // Get post info
                let hasEmptyHeart = await page.$(publication.greyHeartIcon);

                let username = await page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, publication.username);

                let followStatus = await page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, publication.followLink);

                let hasLikeButton = await page.evaluate(() => {
                    let element = document.querySelector('span.fr66n > button');
                    return Promise.resolve(element ? element.innerHTML : undefined);
                })

                let hasCloseButton = await page.evaluate(() => {
                    let element = document.querySelector(publication.closeBtn);
                    console.log(element)
                    return Promise.resolve(element ? element.innerHTML : undefined);
                })

                consoleMessage('log', '---> Evaluating post from ' + username)

                // Decide to like post
                if (hasEmptyHeart && hasLikeButton && Math.random() < 0.5) {
                    await page.click(publication.likeBtn);
                    let blocked = await page.evaluate(() => {
                        let element = document.querySelector('._2dDPU');
                        console.log(element)
                        return Promise.resolve(element ? element : undefined);
                    })
                    if(blocked){
                        consoleMessage('error','USER IS BLOCKED')
                        process.exit()
                    } else {
                       consoleMessage('log', '---> like for ' + username)
                        await page.waitFor(15000 + Math.floor(Math.random() * 5000));
                    }
                }

                // Decide to follow user
                if (followStatus === 'Follow' && Math.random() < 0.25) {
                    await page.click(publication.follow_link).then(() => {
                        consoleMessage('log', '---> follow for ' + username)
                        return page.waitFor(15000 + Math.floor(Math.random() * 5000));
                    }).catch(() => {
                        consoleMessage('log', '---> Already following ' + username)
                    });
                }

                // Close post
                if(hasCloseButton){
                    await page.click('button.ckWGn').catch(() => consoleMessage('error', ':::> Error closing post'))
                }
            }
        }
    }*/

    // Close browser
    browser.close();
  } catch(error){
        console.error(error)
        consoleMessage('error', 'ERROR! Restarting...')
        process.exit()
    }
};

instaBot()