import axios from 'axios'
// const BASE_URL = "https://api.openbrewerydb.org/breweries?per_country=united_states";
//const BASE_URL = " https://api.openbrewerydb.org/breweries?per_page=100";
// Brewers API url's:
// by Cities: 
// https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3
// by States:
// https://api.openbrewerydb.org/breweries?by_state=new_york&per_page=3
// by Types:
// possilbe Types:
// mirco, nano, regional, brewpub, large, plannung, bar, contact, proprietor, closed
// https://api.openbrewerydb.org/breweries?by_type=micro&per_page=3

/* A single response contents:
    {
        "id": "10-56-brewing-company-knox",
        "name": "10-56 Brewing Company",
        "brewery_type": "micro",
        "street": "400 Brown Cir",
        "address_2": null,
        "address_3": null,
        "city": "Knox",
        "state": "Indiana",
        "county_province": null,
        "postal_code": "46534",
        "country": "United States",
        "longitude": "-86.627954",
        "latitude": "41.289715",
        "phone": "6308165790",
        "website_url": null,
        "updated_at": "2022-08-20T02:56:08.975Z",
        "created_at": "2022-08-20T02:56:08.975Z"
    },
*/

const BASE_URL = " https://api.openbrewerydb.org/breweries";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
    }
})
