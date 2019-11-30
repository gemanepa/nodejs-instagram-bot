import consoleMessage from '../utils/consoleMessage.mjs';


export default async function loginProcess(page, selectors) {
    const { prelogin, login } = selectors;
    consoleMessage('header', 'Login Process', true)

    try{
        page.setViewport({width: 1200, height: 764});
    
        // Load Instagram
        
        await page.goto('https://www.instagram.com');
        await page.waitFor(2500);
        consoleMessage('info', 'Instagram Prelogin Page loaded')
        await page.click(prelogin.toLoginBtn);
        consoleMessage('info', 'Log In button pressed')
        await page.waitFor(2500);
        consoleMessage('info', 'Instagram Login Page loaded')
    
        // Login
        await page.click(login.usernameInput);
        try {
            await page.keyboard.type(process.env.USERNAME);
            consoleMessage('info', 'Username typed into input')
        } catch(e){
            console.error(e)
            consoleMessage('error', 'NO .env USERNAME variable detected')
        }
        
        await page.click(login.passInput);
        try {
            await page.keyboard.type(process.env.PASSWORD);
            consoleMessage('info', 'Password typed into input')
        } catch(e){
            console.error(e)
            consoleMessage('error', 'NO .env PASSWORD variable detected')
        }
       
    
        await page.click(login.submitBtn);
        consoleMessage('info', 'Login button clicked.')
        await page.waitForNavigation();
        consoleMessage('info', 'Awaiting for validation...')
    } catch(error){
        console.error(error)
        consoleMessage('error', 'loginProcess Failure')
        process.exit()
    }
}