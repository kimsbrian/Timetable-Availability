# Timetable-Availability
A Node.js application to find open sections of a class and send pushover notifications
## Requirements
- Axios -v 0.19.0
- puppeteer -v 1.18.1
- Node.js -v 12.6.0
- Ubuntu -v 18.04

## Installation
1. Install node.js - Follow this [link](https://github.com/nodesource/distributions/blob/master/README.md) to install the latest version.
2. Copy this repository into any folder ` git clone https://github.com/kimsbrian/Timetable-Availability.git`
3. CD into the directory
4. Run `npm install`
<details>
  <summary>5. Install other Ubuntu Dependencies</summary>
  
```
gconf-service
libasound2
libatk1.0-0
libatk-bridge2.0-0
libc6
libcairo2
libcups2
libdbus-1-3
libexpat1
libfontconfig1
libgcc1
libgconf-2-4
libgdk-pixbuf2.0-0
libglib2.0-0
libgtk-3-0
libnspr4
libpango-1.0-0
libpangocairo-1.0-0
libstdc++6
libx11-6
libx11-xcb1
libxcb1
libxcomposite1
libxcursor1
libxdamage1
libxext6
libxfixes3
libxi6
libxrandr2
libxrender1
libxss1
libxtst6
ca-certificates
fonts-liberation
libappindicator1
libnss3
lsb-release
xdg-utils
wget
```
</details>

## Configuration
1. Edit the index.js file `nano index.js`
2. Enter your own Pushover API keys and your custom message
3. Change the term year, subject code, and course number. Default is Fall 2019, CS, 2104.
4. Optional - Uncomment the two CRN lines and change to your specificed CRN


## Startup

1. Run node index.js in the terminal to test if it works
2. Install npm2 `npm install pm2 -g`
3. `sudo pm2 start index.js`
4. `sudo pm2 startup`
