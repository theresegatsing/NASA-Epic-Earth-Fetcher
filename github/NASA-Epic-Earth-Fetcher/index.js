// Author : Therese Elvira Mombou Gatsing


const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const open = require('open').default;

// API Configuration
const Base_URL = "https://api.nasa.gov/EPIC/api/natural/date/{YYYY-MM-DD}";
const API_Key = "jEXcxb1MPL2ndsI8g3XU3CWOR020N6H4XTRmYA71";
const DATA_FILE = 'epic_data.json';

const getEpicdata = async (date) => {
    try {
        const full_URL = Base_URL.replace("{YYYY-MM-DD}", date) + "?api_key=" + API_Key;
        const response = await axios.get(full_URL);  

        if (response.status === 200) {
            fs.writeFileSync(DATA_FILE, JSON.stringify(response.data, null, 2));
            console.log("Data saved to epic_data.json");
            return true;
        } else {
            console.log("Date not found or invalid API key.");
            return false;
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return false;
    }
};

async function showRandomEpicImage(filePath) {
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const images = JSON.parse(raw);

        if (!Array.isArray(images) || images.length === 0) {
            console.log('No images found in data.');
            return;
        }

        const img = images[Math.floor(Math.random() * images.length)];
        
        console.log('\nNASA EPIC Image Details:');
        console.log('🕒 Time (UTC):', img.date);
        console.log('📝 Caption:', img.caption);

        // Construct the image URL
        const dateParts = img.date.split(' ')[0].split('-');
        const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateParts.join('/')}/jpg/${img.image}.jpg`;
        
        console.log('\n🌍 Opening image in your browser...');
        await open(imgUrl); // This will open the image URL in default browser

    } catch (error) {
        console.error("Error displaying image:", error.message);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the date (YYYY-MM-DD): ', async (date) => {
    rl.close();
    const success = await getEpicdata(date);
    if (success) {
        await showRandomEpicImage(DATA_FILE);
    }
});