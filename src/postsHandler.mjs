import getPostInfo from './getPostInfo';
import postLiker from './postLiker';
import userFollower from './userFollower';
import postCloser from './postCloser';
import selectPost from './selectPost';
import consoleMessage from '../utils/consoleMessage';

export default async function postsHandler(page, hashtags, selector) {
    try {
        // Search for hashtags
        for (let hl = 0; hl < hashtags.length; hl++) {
            await page.goto(`https://www.instagram.com/explore/tags/${hashtags[hl]}/?hl=en`);
            consoleMessage('info', `\n===> hashtag search: ${hashtags[hl]}`)
            
            // Loop through the latest 9 posts
            for (let parentDiv = 1; parentDiv < 4; parentDiv++) {
                for (let childDiv = 1; childDiv < 4; childDiv++) {
                    const postSelected = await selectPost(page, parentDiv, childDiv);
                    if (!postSelected) continue;

                    const postInfo = await getPostInfo(page, selector);
                    const { username, hasLikeButton, hasCloseButton, hasEmptyHeart, followStatus} = postInfo

                    await postLiker(page, selector, username, hasEmptyHeart, hasLikeButton)
                    await userFollower(page, selector, username, followStatus)
                    await postCloser(page, hasCloseButton)
                }
            }
        }
      } catch(error){
            console.error(error)
            consoleMessage('error', 'postsHandler failure')
            process.exit()
        }
}