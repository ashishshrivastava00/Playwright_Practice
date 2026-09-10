const {test,expect}=require('@playwright/test')  //to initiate the playwright test framework

test.only('first test', async ({browser})=>   //async is a keyword for asynchronous functions
{
    const browserContext = await browser.newContext(); //to create a new browser context
    await browserContext.grantPermissions(['local-network-access']);
    const page = await browserContext.newPage();  //to create a new page in the browser context
    const password= page.locator("[type='password']") //to locate the password field
    const cardtitles = page.locator(".card-body a") //to locate the card titles
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000
    });
   console.log(await page.title());  //to get the title of the page
   await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
   await page.locator("#username").fill("rahulshettyacademy");
   await password.fill("Learning");
   await page.locator("#signInBtn").click();
   page.pause();
    console.log(await page.locator("[style*='block']").textContent());
   //console.log(await page.locator("[style*='block']").inputValue());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await password.fill("");
   await password.fill("Learning@830$3mK2")
   await page.locator("#signInBtn").click();
   console.log(await cardtitles.first().textContent());
   console.log(await cardtitles.nth(1).textContent());
   const cardTexts = await cardtitles.allTextContents();
   console.log(cardTexts);
   //await page.screenshot({ path: 'screenshot.png' });



});

test('UI Controls', async ({page}) =>   //async is a keyword for asynchronous functions
{
     await page.goto('https://rahulshettyacademy.com/loginpagePractise/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
    });
    console.log(await page.title());  //to get the title of the page
    const documentlink = page.locator("[href*='documents-request']")
   await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');//to check if the title of the page is 'Google'
   await page.locator("#username").fill("rahulshettyacademy");
   const password= page.locator("[type='password']"); //to locate the password field
   await password.fill("learning@830$3mK2");
   const radiobtn = page.locator(".customradio");  //to locate the radio buttons
    await radiobtn.last().click();
    await page.locator("#okayBtn").click();
    await expect(await radiobtn.last()).toBeChecked();
   const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await expect(await dropdown).toHaveValue("consult");
    await page.locator("#terms").check();
    await expect(await page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
   // await expect(await page.locator("#terms")).isChecked().toBeFalsy();
   // await expect(await documentlink).toHaveAttribute("class","blinkingText");
    await page.pause();
   await page.locator("#signInBtn").click();
   //console.log(await cardbody.first().textContent());
   //console.log(await cardbody.nth(0).textContent());
   //await page.waitForLoadState('networkidle');
  // const cardname = await cardbody.allTextContents();
  //console.log(cardname);
});

test('Child Window validation', async ({browser}) =>   //async is a keyword for asynchronous functions
{
    const browserContext = await browser.newContext(); //to create a new browser context
    await browserContext.grantPermissions(['local-network-access']);
    const page = await browserContext.newPage(); 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
    });
    const documentlink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        browserContext.waitForEvent('page'), //to wait for the new page to open
        documentlink.click(), //to click on the document link
    ]);
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});