const fs = require('fs');
const path = require('path');

// List of all sector analysis HTML files
const sectorFiles = [
    'commercial-banks.html',
    'development-banks.html',
    'finance-companies.html',
    'hotels.html',
    'hydropower.html',
    'investment-companies.html',
    'life-insurance.html',
    'manufacturing-processing.html',
    'microfinance.html',
    'non-life-insurance.html',
    'others.html',
    'trading.html'
];

// Function to update a single file
function updateFile(fileName) {
    const filePath = path.join(__dirname, fileName);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if the file already has the navigation buttons
        if (content.includes('nav-buttons.css') || content.includes('nav-buttons.js')) {
            console.log(`Skipping ${fileName} - already has navigation buttons`);
            return;
        }
        
        // Add CSS link before the closing head tag
        if (!content.includes('nav-buttons.css')) {
            const cssLink = '    <link rel="stylesheet" href="css/nav-buttons.css">';
            content = content.replace('</head>', `    ${cssLink}\n</head>`);
        }
        
        // Add JavaScript before the closing body tag
        if (!content.includes('nav-buttons.js')) {
            const jsScript = '    <script src="js/nav-buttons.js"></script>';
            content = content.replace('</body>', `    ${jsScript}\n</body>`);
        }
        
        // Save the updated file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${fileName} with navigation buttons`);
        
    } catch (error) {
        console.error(`Error updating ${fileName}:`, error.message);
    }
}

// Update all sector files
sectorFiles.forEach(updateFile);
console.log('Navigation buttons update complete!');
