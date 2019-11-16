export default async function selectPost(page, parentDiv, childDiv) {
    const selecting = await page.click('section > main > article > div:nth-child(3) > div > div:nth-child(' + parentDiv + ') > div:nth-child(' + childDiv +') > a').then(() => true).catch(() => {
        return false;
    });
    await page.waitFor(5250 + Math.floor(Math.random() * 250));
    return selecting;
}