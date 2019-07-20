// We'll use Puppeteer is our browser automation framework.
const puppeteer = require('puppeteer');
const axios = require('axios')
// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page) => {
    // Pass the User-Agent Test.
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
    
    // Pass the Webdriver Test.
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });
    
    // Pass the Chrome Test.
    await page.evaluateOnNewDocument(() => {
        // We can mock this in as much depth as we need for the test.
        window.navigator.chrome = {
            runtime: {},
            // etc.
        };
    });
    
    // Pass the Permissions Test.
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
            Promise.resolve({ state: Notification.permission }) :
            originalQuery(parameters)
            );
        });
        
        // Pass the Plugins Length Test.
        await page.evaluateOnNewDocument(() => {
            // Overwrite the `plugins` property to use a custom getter.
            Object.defineProperty(navigator, 'plugins', {
                // This just needs to have `length > 0` for the current test,
                // but we could mock the plugins too if necessary.
                get: () => [1, 2, 3, 4, 5],
            });
        });
        
        // Pass the Languages Test.
        await page.evaluateOnNewDocument(() => {
            // Overwrite the `plugins` property to use a custom getter.
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            });
        });
    }
    
    async function run() {
        // Launch the browser in headless mode and set up a page.
        
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: false,
        });
        
        const page = await browser.newPage();
        
        // Prepare for the tests (not yet implemented).
        await preparePageForTests(page);
        url = "https://banweb.banner.vt.edu/ssb/prod/HZSKVTSC.P_ProcRequest"
        await page.goto(url);
        
        // CSS Selectors to select the elements
        const COURSE_SELECTOR = '.one > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(1) > input:nth-child(1)';
        const CRN_SELECTOR = '.one > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2) > input:nth-child(1)';
        const CLASS_SELECTOR = '.dataentrytable > tbody:nth-child(1) > tr:nth-child(2)'
        const BUTTON_SELECTOR = '.formbutton';
        
        // Pushover API Keys go here
        const data = {
            token: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            user: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            message: "Custom Message"
        }
        
        // Change depending on year and department
        await page.select('select[name="TERMYEAR"]', '201909');
        await page.select('select[name="subj_code"]', 'CS');
        await page.select('select[name="open_only"]', 'on');
        
        
        await page.click(COURSE_SELECTOR);
        // Change course number here
        await page.keyboard.type("2104");
        
        // Uncomment these two lines to specify CRN
        //await page.click(CRN_SELECTOR);
        //await page.keyboard.type("82775");
        
        // Checks every five seconds for a new section. If found, send a Pushover notification
        for (i = 0; i < 10000; i++) {
            
            await page.click(BUTTON_SELECTOR);
            try {
                await page.waitForSelector(CLASS_SELECTOR, { timeout: 1000 })
                axios.post('https://api.pushover.net/1/messages.json', data)
                .then((res) => {
                })
                .catch((error) => {
                    console.error(error)
                })
                console.log("The element did appear.")
                
                // ...
            } catch (error) {
                console.log("The element didn't appear.")
            }
            await page.waitFor(4000);    
        }
        
    }
    run();