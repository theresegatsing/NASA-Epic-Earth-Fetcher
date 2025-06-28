// Author : Therese Elvira Mombou Gatsing

const axios = require('axios');
const fs = require('fs');

//All the requeets are made to the Base URL
const Base_URL = "https://api.nasa.gov/EPIC/api/natural/date/{YYYY-MM-DD}";

// API key for NASA to identify who is making the request
const API_Key = "jEXcxb1MPL2ndsI8g3XU3CWOR020N6H4XTRmYA71";

const getEpicdata(date) => {
    const full_URL = Base_URL.replace("{YYYY-MM-DD}", date) + "?api_key=" + API_Key; // gives the full URL 
    const response = await axios.get(full_URL, {
        params :{
            api_key : API_Key
        }
    })  // making the request

    



}



