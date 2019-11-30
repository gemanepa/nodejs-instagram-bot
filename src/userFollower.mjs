import consoleMessage from '../utils/consoleMessage.mjs';

export default async function userFollower(page, username, followStatus) {
    const randomVal = Math.random();
    if (followStatus === 'Follow' && randomVal < 0.5) {
        await page.click("div.bY2yH > button.oW_lN").then(() => {
            consoleMessage('viinfo', '---> Random Follow: Yes')
            return page.waitFor(15000 + Math.floor(Math.random() * 5000));
        }).catch(() => {
            consoleMessage('viinfo', '---> Random Follow: Already following ' + username)
        });
    } else if(followStatus === 'Follow' && randomVal >= 0.5) {
        consoleMessage('viinfo', '---> Random Follow: No')
    }
}