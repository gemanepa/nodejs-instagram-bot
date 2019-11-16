import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import setHashtags from './src/setHashtags.mjs';
import loginProcess from './src/loginProcess.mjs'
import postFinder from './src/postFinder.mjs'
import selectors from './settings/selectors.json';
import shuffle from './utils/shuffle.mjs';
import consoleMessage from './utils/consoleMessage.mjs';
import getPostInfo from './src/getPostInfo';
import postLiker from './src/postLiker';
import userFollower from './src/userFollower';
import postCloser from './src/postCloser';
dotenv.config();

// if(process.env.SOCIALMEDIA === 'instagram') { instaBot() }
// else if (process.env.SOCIALMEDIA === 'twitter') { twitterBot() }





async function instaBot() {
    consoleMessage('info', 'Starting InstaBot')
    const hashtagsArray = setHashtags();

    const { publication } = selectors;

    // set up Puppeteer
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await loginProcess(page, selectors);


    try {
        await page.goto(`https://www.instagram.com/explore/tags/reactjs/`);
    } catch { consoleMessage('error', `Failure with page.goto('https://www.instagram.com/explore/tags/' + ${hashtag} `) }
    //consoleMessage('info', '\n===> hashtag search: ' + hashtag)
        // Loop through the latest 9 posts


        try {
            const divsCounts = await page.$$eval('main > .KC1QD > div:nth-child(2) > div', divs => divs.innerHTML);
            console.log(divsCounts)
        } catch { console.log('divs 1 did not work')}
        console.log('=====================================')
        try {
            const divsCounts = await page.$$eval('main > .KC1QD > div:nth-child(3) > div', divs => divs.innerHTML);
            console.log(divsCounts)
        } catch { console.log('divs 2 did not work')}
        console.log('=====================================')
/*
   try {
    // Loop through shuffled hashtags
    let hashtags = shuffle(hashtagsArray);
    consoleMessage('info', 'Hashtags shuffle activated.')

    await hashtags.forEach(async function (hashtag) {
            
    for (let r = 1; r < 4; r++) {
        for (let c = 1; c < 4; c++) {
            //Try to select post, wait, if successful continue
            console.log('Trying to select a post')
            let br = false;
            await page.click('main > article > div:nth-child(2) > div > div:nth-child(' + r + ') > div:nth-child(' + c +') > a').catch(() => {
                br = true;
            });
            await page.waitFor(5250 + Math.floor(Math.random() * 250));
            if (br) continue;
            
            // Get post info
            let { username, hasLikeButton, hasCloseButton, hasEmptyHeart, followStatus} = await getPostInfo(page, selector)

            consoleMessage('info', '---> Evaluating post from ' + username)

            await postLiker(page, selector, hasEmptyHeart, hasLikeButton)
            await userFollower(page, selector, username, followStatus)
            await postCloser(page, hasCloseButton)
            
        }
    }
        return true
    });

    // Close browser
    browser.close();
  } catch(error){
        console.error(error)
        consoleMessage('error', 'ERROR! Restarting...')
        process.exit()
    }*/
};

instaBot()