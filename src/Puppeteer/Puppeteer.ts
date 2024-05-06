import puppeteer from "puppeteer";
import { VenueEntity } from "../entities/venue.entity";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class Puppeteer {
  static async scrapePeerspace() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://www.peerspace.com/s/?map_pref=false&p=1&location=toronto--on--canada&a=party"
    );

    const hrefs = await page.evaluate(() => {
      // Select all anchor elements with href attributes starting with "/pages/listings"
      const links = document.querySelectorAll('a[href^="/pages/listings"]');

      // Extract href attribute values and return them as an array
      return Array.from(links).map((link) => link.getAttribute("href"));
    });
    //get all the listing links
    const uniqueArray = hrefs.filter(
      (item, index) => hrefs.indexOf(item) === index
    );
    await browser.close();
    console.log(uniqueArray);
    for (const arr of uniqueArray) {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      const fullUrl = `https://www.peerspace.com${arr}`;
      await page.goto(fullUrl);

      await page.waitForSelector(".ListingLocation");
      await page.waitForSelector("img");
      await page.waitForSelector("h1");
      await page.waitForSelector(".price");
      const price = await page.$eval(".price", (el) => el.textContent);
      const text = await page.evaluate(() => {
        // Use querySelector to select the element and extract its text content
        const locationElement = document.querySelector(".ListingLocation");
        return locationElement?.textContent
          ? locationElement.textContent.trim()
          : null;
      });
      // Extract the text content using page.evaluate
      const numberOfPeople = await page.$eval(
        'img[alt="Person icon"] + span',
        (span) => span.textContent
      );
      const name = await page.$eval("h1", (el) => el.textContent);
      console.log("Location:", text);
      const address = `${text},CA`;
      const coordinates = await Puppeteer.geocodeAddress(address);
      const lat = coordinates.latitude;
      const lon = coordinates.longitude;
      console.log("geo code", coordinates);
      const numOfGuests = Puppeteer.getNumber(numberOfPeople);
      console.log("numOfGuests " + numOfGuests);

      const priceToDb = Puppeteer.getNumber(price);
      console.log("priceToDb " + priceToDb);
      //console.log("Number of People:", numberOfPeople);
      console.log("Price:", price);
      console.log("Num of People:", numberOfPeople);
      console.log("Name of space", name);

      let venueToDB = new VenueEntity();
      if (name && priceToDb && numberOfPeople) {
        venueToDB.location = [lat, lon];
        venueToDB.venuename = name;
        venueToDB.price = priceToDb;
        venueToDB.numOfPeople = parseInt(numberOfPeople);
        venueToDB.link = fullUrl;
      }
      venueToDB = await venueToDB.save();
      console.log(venueToDB);

      await browser.close();
       
      //write it to database
    }
    return;
  }

  //geo convert
  static async geocodeAddress(address) {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        {
          params: {
            address: address,
            key: process.env.GOOGLE_API_KEY, // Replace with your Google Maps API key
          },
        }
      );
      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error geocoding address:", error.message);
      throw error;
    }
  }
  // format to get numOfPeople
  static getNumber(str) {
    const numberPattern = /\d+/; // Matches one or more digits
    const match = str.match(numberPattern);

    if (match) {
      const number = parseInt(match[0], 10); // Convert the matched string to a number
      return number; // Output: 15
    } else {
      console.log("No number found");
      return;
    }
  }

//testing purpose
  static async etest() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const fullUrl =
      "https://www.peerspace.com/pages/listings/60664d3aed3cce000cf4e894?sort_order=24";
    await page.goto(fullUrl);

    await page.waitForSelector(".ListingLocation");
    await page.waitForSelector("img");
    await page.waitForSelector("h1");
    await page.waitForSelector(".price");
    const price = await page.$eval(".price", (el) => el.textContent);
    const text = await page.evaluate(() => {
      // Use querySelector to select the element and extract its text content
      const locationElement = document.querySelector(".ListingLocation");
      return locationElement?.textContent
        ? locationElement.textContent.trim()
        : null;
    });
    // Extract the text content using page.evaluate
    const numberOfPeople = await page.$eval(
      'img[alt="Person icon"] + span',
      (span) => span.textContent
    );

    const name = await page.$eval("h1", (el) => el.textContent);
    console.log("Location:", text);
    const address = `${text},CA`;
    const coordinates = await Puppeteer.geocodeAddress(address);
    const lat = coordinates.latitude;
    const lon = coordinates.longitude;
    console.log("geo code", coordinates);
    const numOfGuests = Puppeteer.getNumber(numberOfPeople);
    console.log("numOfGuests " + numOfGuests);

    const priceToDb = Puppeteer.getNumber(price);
    console.log("priceToDb " + priceToDb);
    //console.log("Number of People:", numberOfPeople);
    console.log("Price:", price);
    console.log("Num of People:", numberOfPeople);
    console.log("Name of space", name);
    //write it to db
    // const newVenue = {
    //   location: { lat, lon },
    //   numOfPeople: numberOfPeople,
    //   price: priceToDb,
    //   name:name
    // };

    // const venueToDB = RespositoryHelper.venueRepo.create(newVenue);
    // await RespositoryHelper.venueRepo.save(venueToDB);
    let venueToDB = new VenueEntity();
    if (name && priceToDb && numberOfPeople) {
      venueToDB.location = [lat, lon ];
      venueToDB.venuename = name;
      venueToDB.price = priceToDb;
      venueToDB.numOfPeople = parseInt(numberOfPeople);
      venueToDB.link = fullUrl;
    }
    venueToDB = await venueToDB.save();
    console.log(venueToDB);

    // newVenue.location = { lat, lon };
    // newVenue.numOfPeople=numberOfPeople

    await browser.close();
    return;
  }
}

export default Puppeteer;

//module.exports = { scrapePeerspace };
//scrapePeerspace();
