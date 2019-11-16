export default async function getPostInfo(page, selector) {
    let username = await page.evaluate(x => {
        let element = document.querySelector(x);
        return Promise.resolve(element ? element.innerHTML : '');
    }, selector.username);

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
}