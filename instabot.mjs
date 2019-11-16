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

async function instaBot() {
    consoleMessage('info', 'Starting InstaBot')
    const hashtagsArray = setHashtags();

    const { publication } = selectors;

    // set up Puppeteer
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await loginProcess(page, selectors);
        
    try {
        // Loop through shuffled hashtags
        let hashtags = shuffle(hashtagsArray);
        consoleMessage('info', 'Hashtags shuffle activated.')
        // Search for hashtags
        for (let hl = 0; hl < hashtags.length; hl++) {
            await page.goto('https://www.instagram.com/explore/tags/' + hashtags[hl] + '/?hl=en');
            consoleMessage('info', '\n===> hashtag search: ' + hashtags[hl])
            // Loop through the latest 9 posts
            for (let r = 1; r < 4; r++) {
                for (let c = 1; c < 4; c++) {
                    //Try to select post, wait, if successful continue
                    let br = false;
                    await page.click('section > main > article > div:nth-child(3) > div > div:nth-child(' + r + ') > div:nth-child(' + c +') > a').catch(() => {
                        br = true;
                    });
                    await page.waitFor(5250 + Math.floor(Math.random() * 250));

                    // Get post info
                    const postInfo = await getPostInfo(page, publication);
                    const { username, hasLikeButton, hasCloseButton, hasEmptyHeart, followStatus} = postInfo

                    consoleMessage('info', '---> Evaluating post from ' + username)

                    await postLiker(page, publication, username, hasEmptyHeart, hasLikeButton)
                    await userFollower(page, publication, username, followStatus)
                    await postCloser(page, hasCloseButton)
                }
            }
        }
        // Close browser
        browser.close();
      } catch(error){
            console.error(error)
            consoleMessage('error', 'ERROR! Restarting...')
            process.exit()
        }
};

instaBot()