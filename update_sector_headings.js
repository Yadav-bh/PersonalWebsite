const fs = require('fs');
const path = require('path');

// Mapping of file names to their display names
const sectorMapping = {
    'commercial-banks.html': 'Commercial Banks',
    'development-banks.html': 'Development Banks',
    'finance-companies.html': 'Finance Companies',
    'hotels.html': 'Hotels',
    'hydropower.html': 'Hydropower',
    'investment-companies.html': 'Investment Companies',
    'life-insurance.html': 'Life Insurance',
    'manufacturing-processing.html': 'Manufacturing & Processing',
    'microfinance.html': 'Microfinance',
    'non-life-insurance.html': 'Non-Life Insurance',
    'others.html': 'Other Sectors',
    'trading.html': 'Trading'
};

// Function to update a single file
function updateFile(fileName) {
    const filePath = path.join(__dirname, fileName);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const sectorName = sectorMapping[fileName] || 'Sector Analysis';
        
        // Replace the heading with a styled version
        const newHeading = `
        <div class="sector-header text-center mb-5">
            <h1 class="display-4 fw-bold text-warning">${sectorName} Analysis</h1>
            <div class="header-underline mx-auto"></div>
        </div>`;
        
        // Find and replace the existing heading
        content = content.replace(
            /<h1 class="text-center mb-5">[^<]*<\/h1>/,
            newHeading
        );
        
        // Add custom CSS for the heading if not already present
        if (!content.includes('sector-header {')) {
            const styleTag = `
            <style>
                .sector-header {
                    padding: 1.5rem 0;
                    position: relative;
                }
                .header-underline {
                    width: 100px;
                    height: 4px;
                    background: linear-gradient(90deg, #ffc107, #ff9800);
                    margin-top: 1rem;
                    border-radius: 2px;
                }
                .text-warning {
                    color: #ffc107 !important;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                }
            </style>`;
            
            // Insert the style before the closing head tag
            content = content.replace('</head>', `${styleTag}
    </head>`);
        }
        
        // Save the updated file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated heading in ${fileName}`);
        
    } catch (error) {
        console.error(`Error updating ${fileName}:`, error.message);
    }
}

// Update all sector files
Object.keys(sectorMapping).forEach(updateFile);
console.log('Sector heading update complete!');
