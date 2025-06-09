/**
 * Function to get the forecasted weather data from OpenWeatherMap.
 *
 * @param {Object} args - Arguments for the weather forecast.
 * @param {string} [args.appid] - The API key for authentication.
 * @param {string} [args.q] - The city name for the weather forecast.
 * @param {number} [args.id] - The city ID for the weather forecast.
 * @param {number} [args.lat] - The latitude of the location.
 * @param {number} [args.lon] - The longitude of the location.
 * @param {string} [args.zip] - The zip code for the location.
 * @param {string} [args.units] - The units for temperature (metric or imperial).
 * @param {string} [args.lang] - The language for the response.
 * @param {string} [args.Mode] - The format of the response (xml, html, or json).
 * @returns {Promise<Object>} - The forecasted weather data.
 */
const executeFunction = async ({ appid, q, id, lat, lon, zip, units, lang, Mode }) => {
  const baseUrl = 'http://api.openweathermap.org/data/2.5/';
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/forecast`);
    if (appid) url.searchParams.append('appid', appid);
    if (q) url.searchParams.append('q', q);
    if (id) url.searchParams.append('id', id);
    if (lat) url.searchParams.append('lat', lat);
    if (lon) url.searchParams.append('lon', lon);
    if (zip) url.searchParams.append('zip', zip);
    if (units) url.searchParams.append('units', units);
    if (lang) url.searchParams.append('lang', lang);
    if (Mode) url.searchParams.append('Mode', Mode);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET'
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecasted weather data:', error);
    return { error: 'An error occurred while fetching forecasted weather data.' };
  }
};

/**
 * Tool configuration for fetching forecasted weather data from OpenWeatherMap.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'forecast_weather',
      description: 'Get the forecasted weather data for a location.',
      parameters: {
        type: 'object',
        properties: {
          appid: {
            type: 'string',
            description: 'The API key for authentication.'
          },
          q: {
            type: 'string',
            description: 'The city name for the weather forecast.'
          },
          id: {
            type: 'integer',
            description: 'The city ID for the weather forecast.'
          },
          lat: {
            type: 'number',
            description: 'The latitude of the location.'
          },
          lon: {
            type: 'number',
            description: 'The longitude of the location.'
          },
          zip: {
            type: 'string',
            description: 'The zip code for the location.'
          },
          units: {
            type: 'string',
            description: 'The units for temperature (metric or imperial).'
          },
          lang: {
            type: 'string',
            description: 'The language for the response.'
          },
          Mode: {
            type: 'string',
            description: 'The format of the response (xml, html, or json).'
          }
        }
      }
    }
  }
};

export { apiTool };