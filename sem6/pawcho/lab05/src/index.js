const express = require('express');
const os = require('os');
const dns = require('dns');
const packageJson = require('./package.json');

const app = express();
const APP_VERSION = packageJson.version || "unknown app version";

const localIp = () => {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let details of interfaces[iface]) {
            if (details.family === 'IPv4' && !details.internal) {
                return details.address;
            }
        }
    }
    return 'unknown';
};

app.get('/', (req, res) => {
    const hostname = os.hostname() || 'unknown';
    const ipAddress = localIp();
    const response = `Server IP: ${ipAddress}\nHostname: ${hostname}\nApp Version: ${APP_VERSION}`;
    res.status(200).send(response);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
