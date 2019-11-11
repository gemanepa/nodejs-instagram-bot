import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import hashtagCategories from './settings/hashtags.json';
import selectors from './settings/selectors.json';
import shuffle from './utils/shuffle.mjs';
import consoleMessage from './utils/consoleMessage.mjs';

dotenv.config();

// if(process.env.SOCIALMEDIA === 'instagram') { instaBot() }
// else if (process.env.SOCIALMEDIA === 'twitter') { twitterBot() }

async function instaBot() {
    consoleMessage('log', 'Starting InstaBot')
    console.log(process.env.USERNAME)
    console.log(process.env.PASSWORD)
    const hashtagsArray = process.env.HASHTAGS ? process.env.HASHTAGS.replace(/"|'|\[|\]| /ig,'').split(',') : hashtagCategories.standard
    console.log(hashtagsArray)
    /*
    // set up Puppeteer
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    try{
    page.setViewport({width: 1200, height: 764});
    //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36');


    // Load Instagram
    await page.goto('https://www.instagram.com');
    await page.waitFor(2500);
    await page.click(selectors.home_to_login_button);
    await page.waitFor(2500);
    consoleMessage('log', 'Instagram Home loaded.')

    // Login
    await page.click(selectors.username_field);
    try {
        await page.keyboard.type(process.env.USERNAME);
    } catch(e){
        console.error(e)
        consoleMessage('error', 'NO .env USERNAME variable detected')
    }
    
    await page.click(selectors.password_field);
    try {
        await page.keyboard.type(process.env.PASSWORD);
    } catch(e){
        console.error(e)
        consoleMessage('error', 'NO .env PASSWORD variable detected')
    }
   

    await page.click(selectors.login_button);
    consoleMessage('log', 'Login clicked.')
    await page.waitForNavigation();
    consoleMessage('log', 'Awaiting for validation...')
} catch(error){
    console.error(error)
    consoleMessage('error', 'ERROR! Restarting...')
    process.exit()
}

   try {
    // Loop through shuffled hashtags
    let hashtags = shuffle(hashtagsArray);
    consoleMessage('log', 'Hashtags shuffle activated.')

    // Search for hashtags
    for (let hl = 0; hl < hashtags.length; hl++) {
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
                let hasEmptyHeart = await page.$(selectors.post_heart_grey);

                let username = await page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, selectors.post_username);

                let followStatus = await page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, selectors.post_follow_link);

                let hasLikeButton = await page.evaluate(() => {
                    let element = document.querySelector('span.fr66n > button');
                    return Promise.resolve(element ? element.innerHTML : undefined);
                })

                let hasCloseButton = await page.evaluate(() => {
                    let element = document.querySelector('button.ckWGn');
                    console.log(element)
                    return Promise.resolve(element ? element.innerHTML : undefined);
                })

                consoleMessage('log', '---> Evaluating post from ' + username)

                // Decide to like post
                if (hasEmptyHeart && hasLikeButton && Math.random() < 0.5) {
                    await page.click(selectors.post_like_button);
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
                    await page.click(selectors.post_follow_link).then(() => {
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

    // Close browser
    browser.close();
  } catch(error){
        console.error(error)
        consoleMessage('error', 'ERROR! Restarting...')
        process.exit()
    }*/
};

instaBot()