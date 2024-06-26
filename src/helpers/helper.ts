import axios from 'axios';

interface Location {
  lat: number;
  lon: number;
  price: number;
  id: number;
  numOfG: number;
}

// Function to calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Function to find nearby locations with price
export function findNearbyLocations(
  requestedLocation: Location,
  locations: Location[],
  radius: number
): Location[] {
  const { lat: reqLat, lon: reqLon, price: budget, numOfG: numberOfGuests } = requestedLocation; //user's address preferred
  const nearbyLocations = locations.filter((location) => {
    const { lat, lon, price, numOfG } = location;
    const distance = calculateDistance(reqLat, reqLon, lat, lon);

    const priceDifference = Math.abs(price - budget);
    console.log(distance + " " + priceDifference);
    return (
      distance <= radius && priceDifference <= 600 && numOfG > numberOfGuests
    );
  });
  return nearbyLocations;
}

export function getRandomElement(arr) {
  // Generate a random index within the range of the array's length
  const randomIndex = Math.floor(Math.random() * arr.length);
  // Return the element at the random index
  return arr[randomIndex];
}

export async function getCoverPhoto() {
  const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
  try {
    const pagenumber = Math.floor(Math.random() * 20);
    const url = `https://api.unsplash.com/search/photos?page=${pagenumber}&per_page=1&query=balloon-happy-colorful&color=red&order_by=relevant&content_filter=high&client_id=${UNSPLASH_KEY}`;
    
    const response = await axios.get(url);

  const photoUrl = response.data.results[0].urls.small;
   console.log(JSON.stringify(photoUrl) +"!!!~~~~~~~~");
    return photoUrl;
  } catch (error) {
    console.error("Error get photos from unsplash:", error.message);
    throw error;
  }
}

// export const formatCoordinateString = (coordinateString : string) => {
//   const regex: RegExp = /\(([^,]+),\s+([^)]+)\)/; // Regular expression to extract latitude and longitude

//   // Extract latitude and longitude using regular expression
//   const match: RegExpExecArray | null = regex.exec(coordinateString);
//   if (match) {
//     const lat: number = parseFloat(match[1]); // Convert latitude string to float
//     const lon: number = parseFloat(match[2]); // Convert longitude string to float

//     // Create an object with latitude and longitude properties
//     const coordinates: { lat: number; lon: number } = {
//       lat,
//       lon,
//     };

//     console.log("Formatted coordinates:", coordinates);

//     return coordinates;
//   } else {
//     console.log("Invalid coordinate string:", coordinateString);
//   }
// };
