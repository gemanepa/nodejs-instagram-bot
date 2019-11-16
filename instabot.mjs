import dotenv from 'dotenv';
import { launchPuppeteer, finishApp } from './src/appLifecycle.mjs';
import setHashtags from './src/setHashtags.mjs';
import loginProcess from './src/loginProcess.mjs';
import postsHandler from './src/postsHandler.mjs';
import selectors from './settings/selectors.json';
import headless from './settings/headless.json';

dotenv.config();

async function instaBot() {
    const { browser, page } = await launchPuppeteer(headless);
    await loginProcess(page, selectors);
    await postsHandler(page, setHashtags(), selectors.publication)
    await finishApp(browser);
};

instaBot()