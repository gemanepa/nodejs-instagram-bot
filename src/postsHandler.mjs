import getPostInfo from './getPostInfo';
import postLiker from './postLiker';
import userFollower from './userFollower';
import postCloser from './postCloser';
import selectPost from './selectPost';
import selectors from '../settings/selectors.json';
import consoleMessage from '../utils/consoleMessage';

export default async function postsHandler(page) {
    const selector = selectors.publication

    try {
        // Loop through the latest 9 posts
        for (let parentDiv = 1; parentDiv < 4; parentDiv++) {
            for (let childDiv = 1; childDiv < 4; childDiv++) {
                const postSelected = await selectPost(page, parentDiv, childDiv);
                if (!postSelected) continue;

                const postInfo = await getPostInfo(page, selector, parentDiv, childDiv);
                const { username, hasLikeButton, hasCloseButton, hasEmptyHeart, followStatus} = postInfo

                process.env.LIKE == 'true' && await postLiker(page, selector, username, hasEmptyHeart, hasLikeButton)
                process.env.FOLLOW == 'true' && await userFollower(page, username, followStatus)
                await postCloser(page, hasCloseButton)
            }
        }
    } catch(error) {
        console.error(error);
        consoleMessage('error', 'postsHandler failure')
        process.exit()
    }

}