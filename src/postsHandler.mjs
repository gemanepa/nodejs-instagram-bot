import getPostInfo from './getPostInfo';
import postLiker from './postLiker';
import userFollower from './userFollower';
import postCloser from './postCloser';
import consoleMessage from '../utils/consoleMessage';

export default async function postsHandler(page, hashtags, selectors) {
    const { publication } = selectors;

    try {
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

      } catch(error){
            console.error(error)
            consoleMessage('error', 'ERROR! Restarting...')
            process.exit()
        }
}