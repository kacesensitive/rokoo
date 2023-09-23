const axios = require("axios");

async function scanNetwork() {
    const ipPartials = ["192", "168", "1"];
    const port = "8060";
    let foundRokus = [];

    for (let i = 230; i <= 254; i++) {
        const ip = `${ipPartials[0]}.${ipPartials[1]}.${ipPartials[2]}.${i}`;
        try {
            const resp = await axios.get(`http://${ip}:${port}/query/icon/12`, {
                timeout: 500,
                headers: {
                    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                    "accept-language": "en-US,en;q=0.9",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                }
            });
            if (resp.headers['server'] && resp.headers['server'].includes('Roku')) {
                foundRokus.push({ ip, port });
            }
        } catch (error) {
            if (error.response && error.response.headers['server'] && error.response.headers['server'].includes('Roku')) {
                foundRokus.push({ ip, port });
            }
        }
    }

    console.log("Found Rokus:", foundRokus);
}

scanNetwork();
