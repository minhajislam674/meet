import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event'); //API method waitForSelector() to wait until a desired element appears
    });

    afterAll(() => {
        browser.close();
      });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
      });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .show-details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });
    
    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .hide-details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

});

describe('Filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event'); //API method waitForSelector() to wait until a desired element appears
    });

    afterAll(() => {
        browser.close();
      });


    test('When user has not searched for a city, show upcoming events from all cities.', async () => {
        const eventCount = await page.$$eval('.event', eventList => eventList.length);
        expect(eventCount).toBe(2);
      });

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('.city', 'Ber', {delay: 100}); 
        const suggestionsCount = await page.$$eval('.suggestions li', nodes => nodes.map(n => n.innerText));
        expect(suggestionsCount).toEqual(['Berlin, Germany', 'See all cities'])
    });
    
    test('User can select a city from the suggested list', async () => {
        await page.click('.suggestions li');
        const eventCount = await page.$$eval('.event', eventList => eventList.length);
        expect(eventCount).toBe(1);

    });

});