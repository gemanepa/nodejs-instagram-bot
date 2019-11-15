import consoleMessage from '../utils/consoleMessage.mjs';

export default async function userFollower(page, selector, username, followStatus) {
    if (followStatus === 'Follow' && Math.random() < 0.25) {
        await page.click(selector.follow_link).then(() => {
            consoleMessage('info', '---> follow for ' + username)
            return page.waitFor(15000 + Math.floor(Math.random() * 5000));
        }).catch(() => {
            consoleMessage('info', '---> Already following ' + username)
        });
    }
}