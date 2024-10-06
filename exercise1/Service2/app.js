const express = require('express');
const { execSync } = require('child_process');
const os = require('os');

const app = express();
const port = 8198;

// Function to get IP address
function getIpAddress() {
    const interfaces = os.networkInterfaces();
    let ipAddress = '';
    for (let iface in interfaces) {
        for (let details of interfaces[iface]) {
            if (details.family === 'IPv4' && !details.internal) {
                ipAddress = details.address;
            }
        }
    }
    return ipAddress;
}

// Function to get list of running processes (ps -ax)
function getProcesses() {
    try {
        const processes = execSync('ps -ax').toString().split('\n');
        return processes;
    } catch (error) {
        return ['Error fetching processes'];
    }
}

// Function to get disk space (df -h /)
function getDiskSpace() {
    try {
        const diskSpace = execSync('df -h /').toString().split('\n');
        return diskSpace;
    } catch (error) {
        return ['Error fetching disk space'];
    }
}

// Function to get uptime (uptime -p)
function getUptime() {
    try {
        const uptime = execSync('uptime -p').toString().trim();
        return uptime;
    } catch (error) {
        return 'Error fetching uptime';
    }
}

// Route to handle '/' request
app.get('/', (req, res) => {
    const systemInfo = {
        ip_address: getIpAddress(),
        processes: getProcesses(),
        disk_space: getDiskSpace(),
        uptime: getUptime(),
    };

    // Return JSON response
    res.json(systemInfo);
});

// Start the server
app.listen(port, () => {
    console.log(`Service2 running on port ${port}`);
});