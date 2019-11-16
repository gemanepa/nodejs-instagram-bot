import puppeteer from 'puppeteer';
import consoleMessage from '../utils/consoleMessage.mjs';

export async function launchPuppeteer(headless) {
    consoleMessage('info', 'Starting InstaBot')
    const browser = await puppeteer.launch(headless);
    const page = await browser.newPage();
    return { browser, page }
}

export async function finishApp(browser) {
    browser.close();
    consoleMessage('info', 'InstaBot successfully finished')
    process.exit();
}