import consoleMessage from '../utils/consoleMessage';

export default async function getPostInfo(page, selector, parentDiv, childDiv) {
    
    try {
        let username = await page.evaluate(x => {
            let element = document.querySelector(x);
            return Promise.resolve(element ? element.innerHTML : '');
        }, selector.username);

        const notLogBreakline = (parentDiv === 1 && childDiv === 1)
        consoleMessage('info', `Getting post of user ${username}`, notLogBreakline ? false : true)

        let hasLikeButton = await page.evaluate(() => {
            let element = document.querySelector('span.fr66n > button');
            return Promise.resolve(element ? element.innerHTML : undefined);
        })
    
        let hasCloseButton = await page.evaluate(() => {
            let element = document.querySelector('button.ckWGn');
            console.log(element)
            return Promise.resolve(element ? element.innerHTML : undefined);
        })
    
        let hasEmptyHeart = await page.$(selector.greyHeartIcon);
    
        let followStatus = await page.evaluate(x => {
            let element = document.querySelector(x);
            return Promise.resolve(element ? element.innerHTML : '');
        }, selector.followLink);
    
        return { username, hasLikeButton, hasCloseButton, hasEmptyHeart, followStatus }
    } catch(error) {
        console.error(error);
        consoleMessage('error', 'getPostInfo failure')
        process.exit()
    }
}