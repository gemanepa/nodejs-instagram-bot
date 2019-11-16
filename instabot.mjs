import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import setHashtags from './src/setHashtags.mjs';
import loginProcess from './src/loginProcess.mjs'
import postsHandler from './src/postsHandler.mjs'
import selectors from './settings/selectors.json';
import consoleMessage from './utils/consoleMessage.mjs';

dotenv.config();

async function instaBot() {
    consoleMessage('info', 'Starting InstaBot')
    const hashtags = setHashtags();

    // set up Puppeteer
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await loginProcess(page, selectors);
    await postsHandler(page, hashtags, selectors)

    browser.close();
};

instaBot()