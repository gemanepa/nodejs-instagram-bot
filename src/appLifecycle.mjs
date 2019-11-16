import puppeteer from 'puppeteer';
import consoleMessage from '../utils/consoleMessage.mjs';

export async function launchPuppeteer(headless) {
    consoleMessage('intro', 'INSTABOT', true)
    consoleMessage('intro', 'Any issue or improvement idea to report?')
    consoleMessage('intro', '--> github.com/gemanepa/nodejs-instagram-bot')
    consoleMessage('intro', 'Starting...')
    try {        
        const browser = await puppeteer.launch(headless);
        const page = await browser.newPage();
        return { browser, page }
    } catch(error) {
        console.error(error);
        consoleMessage('error', 'launchPuppeteer failure')
        process.exit()
    }
}

export async function finishApp(browser) {
    browser.close();
    consoleMessage('info', 'InstaBot successfully finished')
    process.exit();
}