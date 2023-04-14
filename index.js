import puppeteer from "puppeteer";

const username = "username@example.com";
const password = "password";

async function main() { 
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        defaultViewport: null,
        args: [
            "--disable-blink-features=AutomationControlled",
        ],
    });

    const page = await browser.newPage();

    await page.goto("https://nike.com/login");

    await page.evaluate(() => {
        window.open("https://nike.com/login", "_blank");
        setTimeout(() => window.location.reload(), 3000);
    });

    await page.bringToFront();
    await page.waitForTimeout(3000);
    await page.waitForSelector("#username");
    await moveMouse(page);
    await page.type("#username", username, { delay: 250 });
    await page.click("button[type='submit']", { delay: 100 });

    await page.waitForSelector("#password");
    await moveMouse(page);
    await page.type("#password", password, { delay: 250 });
    await page.click("button[type='submit']", { delay: 100 });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function moveMouse(page) {
    const coords = [500, 500];

    for (let i = 0; i < 100; i++) {
        coords[0] += randomInt(-2, 2);
        coords[1] += randomInt(-2, 2);

        await page.mouse.move(...coords);

        const delay = randomInt(1, 3);
        await page.waitForTimeout(delay);
    }
}

main();
