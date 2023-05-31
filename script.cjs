/* eslint-disable */

const fs = require('fs');
const path = require('path');

// Define the source and destination directories
const sourceDir = path.join(__dirname, 'build');
const destinationDir = path.join(__dirname, "electron", "src", 'build');

// Check if the destination directory already exists
if (fs.existsSync(destinationDir)) {
    // Remove the existing destination directory
    fs.rmSync(destinationDir, { recursive: true });
}

// Create the destination directory
fs.mkdirSync(destinationDir, { recursive: true });

// Move the build files to the destination directory
fs.readdirSync(sourceDir).forEach((file) => {
    fs.renameSync(path.join(sourceDir, file), path.join(destinationDir, file));
});

console.log('Build files moved successfully!');
