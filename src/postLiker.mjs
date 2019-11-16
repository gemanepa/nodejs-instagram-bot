import consoleMessage from '../utils/consoleMessage.mjs';

export default async function postLiker(page, selector, username, hasEmptyHeart, hasLikeButton) {
    const randomVal = Math.random();
    try {
        if (hasEmptyHeart && hasLikeButton && randomVal < 0.5) {
            await page.click(selector.likeBtn);
            let blocked = await page.evaluate(() => {
                let element = document.querySelector('._2dDPU');
                console.log(element)
                return Promise.resolve(element ? element : undefined);
            })
            if(blocked){
                consoleMessage('error', "Account is blocked from giving likes")
                process.exit()
            } else {
                consoleMessage('viinfo', '---> Random Like: Yes');
                await page.waitFor(15000 + Math.floor(Math.random() * 5000));
            }
        } else if(hasEmptyHeart && hasLikeButton && randomVal >= 0.5) {
            consoleMessage('viinfo', '---> Random Like: No');
        }
    } catch(error) {
        console.error(error)
        consoleMessage('error', 'postLiker function Failure')
        process.exit()
    }
}