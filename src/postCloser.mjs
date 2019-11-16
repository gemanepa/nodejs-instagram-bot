import consoleMessage from '../utils/consoleMessage.mjs';

export default async function postCloser(page, hasCloseButton) {
    if(hasCloseButton){
        await page.click('button.ckWGn').catch(() => consoleMessage('error', 'postCloser function. Error closing post'))
    } 
}