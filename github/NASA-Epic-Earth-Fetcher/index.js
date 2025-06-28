// Author : Therese Elvira Mombou Gatsing

const axios = require('axios');
const fs = require('fs');

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
getEpicdata("2022-05-25");


