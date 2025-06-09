/**
 * Function to access historical weather data from OpenWeatherMap.
 *
 * @param {Object} args - Arguments for the weather history request.
 * @param {number} args.lat - The latitude of the location.
 * @param {number} args.lon - The longitude of the location.
 * @param {number} args.start - The start time for the historical data (Unix timestamp).
 * @param {number} args.end - The end time for the historical data (Unix timestamp).
 * @returns {Promise<Object>} - The result of the weather history request.
 */
const executeFunction = async ({ lat, lon, start, end }) => {
  const baseUrl = 'http://api.openweathermap.org/data/2.5/history/city';
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('lat', lat);
    url.searchParams.append('lon', lon);
    url.searchParams.append('type', 'hour');
    url.searchParams.append('start', start);
    url.searchParams.append('end', end);
    url.searchParams.append('appid', apiKey);

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
    console.error('Error accessing weather history:', error);
    return { error: 'An error occurred while accessing weather history.' };
  }
};

/**
 * Tool configuration for accessing historical weather data from OpenWeatherMap.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_weather_history',
      description: 'Access historical weather data for a specific location.',
      parameters: {
        type: 'object',
        properties: {
          lat: {
            type: 'number',
            description: 'The latitude of the location.'
          },
          lon: {
            type: 'number',
            description: 'The longitude of the location.'
          },
          start: {
            type: 'number',
            description: 'The start time for the historical data (Unix timestamp).'
          },
          end: {
            type: 'number',
            description: 'The end time for the historical data (Unix timestamp).'
          }
        },
        required: ['lat', 'lon', 'start', 'end']
      }
    }
  }
};

export { apiTool };