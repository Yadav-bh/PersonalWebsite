const fs = require('fs');
const path = require('path');

// List of all sector HTML files
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
        
        // Remove the "Back to Sectors" button (lines 93-95 in the example)
        content = content.replace(
            /<a href="index\.html#sector-analysis" class="btn btn-outline-primary back-button">\s*<i class="bi bi-arrow-left"><\/i> Back to Sectors\s*<\/a>\s*/g,
            ''
        );
        
        // Save the updated file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated navigation in ${fileName}`);
        
    } catch (error) {
        console.error(`Error updating ${fileName}:`, error.message);
    }
}

// Update all sector files
sectorFiles.forEach(updateFile);
console.log('Navigation update complete!');
