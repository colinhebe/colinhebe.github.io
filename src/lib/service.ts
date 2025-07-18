// Fetch a random PNG from robohash.org
export async function fetchRandomRobohashPng(): Promise<string> {
  // robohash.org returns PNG directly for any string
  // To get randomness, use a random string each time
  const randomSeed = Math.random().toString(36).substring(2, 10);
  const url = `https://robohash.org/${randomSeed}?set=set3&size=200x200`;
  // Return the PNG image URL directly
  return url;
}
