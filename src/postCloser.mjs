import consoleMessage from '../utils/consoleMessage.mjs';

export default async function(page, hasCloseButton) {
    if(hasCloseButton){
        await page.click('button.ckWGn').catch(() => consoleMessage('error', ':::> Error closing post'))
    }
}