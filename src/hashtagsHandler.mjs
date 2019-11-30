import postsHandler from './postsHandler';
import consoleMessage from '../utils/consoleMessage';

export default async function hashtagsHandler(page, hashtags) {
    consoleMessage('info', 'Entered Instagram')
    try {
        // Search for hashtags
        for (let hl = 0; hl < hashtags.length; hl++) {
            await page.goto(`https://www.instagram.com/explore/tags/${hashtags[hl]}/?hl=en`);
            consoleMessage('header', '=======================================', true)
            consoleMessage('header', `Hashtag: ${hashtags[hl]}`)

            await postsHandler(page)
        }
      } catch(error){
            console.error(error)
            consoleMessage('error', 'hashtagsHandler failure')
            process.exit()
        }
}