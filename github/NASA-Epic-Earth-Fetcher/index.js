// Author : Therese Elvira Mombou Gatsing

const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

//All the requeets are made to the Base URL
const Base_URL = "https://api.nasa.gov/EPIC/api/natural/date/{YYYY-MM-DD}";

// API key for NASA to identify who is making the request
const API_Key = "jEXcxb1MPL2ndsI8g3XU3CWOR020N6H4XTRmYA71";

const getEpicdata = async (date) => {

    const full_URL = Base_URL.replace("{YYYY-MM-DD}", date) + "?api_key=" + API_Key; // gives the full URL 
    // making the request
    const response = await axios.get(full_URL);  

    if (response.status === 200) {
        data = response.data;
        fs.writeFileSync('epic_data.json', JSON.stringify(data, null, 2)); // save the data to a file
        console.log("Data saved to epic_data.json");
        //console.log(data);
    } else {
        console.log("Date not found or invalid API key.");
    }

};

// Use this function whenever you want a random image from stored data
function showRandomEpicImage(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const images = JSON.parse(raw);

  if (!Array.isArray(images) || images.length === 0) {
    console.log('No images found in data.');
    return;
  }

  const i = Math.floor(Math.random() * images.length);
  const img = images[i];

  // Extract timestamp and caption
  console.log('🕒 Time (UTC):', img.date);
  console.log('📝 Caption:', img.caption);

  // Build and display the image URL
  const dateParts = img.date.split(' ')[0].split('-');
  const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateParts.join('/')}/jpg/${img.image}.jpg`;
  console.log('🌍 Image URL:', imgUrl);
}





const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the date (YYYY-MM-DD): ', date => {
  console.log('You entered:', date);
  getEpicdata(date); 
  showRandomEpicImage(); // Show a random image from the saved data
  rl.close();
});

