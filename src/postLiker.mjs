import consoleMessage from '../utils/consoleMessage.mjs';

export default async function postLiker(page, selector, username, hasEmptyHeart, hasLikeButton) {
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
           consoleMessage('info', '---> like for ' + username)
            await page.waitFor(15000 + Math.floor(Math.random() * 5000));
        }
    }
}