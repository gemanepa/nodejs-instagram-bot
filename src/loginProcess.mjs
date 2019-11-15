import consoleMessage from '../utils/consoleMessage.mjs';


export default async function loginProcess(page, selectors) {
    const { prelogin, login } = selectors;

    try{
        page.setViewport({width: 1200, height: 764});
    
        // Load Instagram
        await page.goto('https://www.instagram.com');
        await page.waitFor(2500);
        await page.click(prelogin.toLoginBtn);
        await page.waitFor(2500);
        consoleMessage('info', 'Instagram Home loaded.')
    
        // Login
        await page.click(login.usernameInput);
        try {
            await page.keyboard.type(process.env.USERNAME);
        } catch(e){
            console.error(e)
            consoleMessage('error', 'NO .env USERNAME variable detected')
        }
        
        await page.click(login.passInput);
        try {
            await page.keyboard.type(process.env.PASSWORD);
        } catch(e){
            console.error(e)
            consoleMessage('error', 'NO .env PASSWORD variable detected')
        }
       
    
        await page.click(login.submitBtn);
        consoleMessage('info', 'Login clicked.')
        await page.waitForNavigation();
        consoleMessage('info', 'Awaiting for validation...')
    } catch(error){
        console.error(error)
        consoleMessage('error', 'ERROR! Restarting...')
        process.exit()
    }
}