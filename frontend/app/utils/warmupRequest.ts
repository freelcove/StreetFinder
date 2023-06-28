  /**
   * Makes a 'warmup' request to the '/warmup' endpoint.
   * This is intended to be used to 'warm up' the server, e.g. ensure that
   * various caches are filled, database connections are established, etc. before
   * the main part of the application starts using those resources.
   * Logs the response message to the console or logs an error if the request fails.
   */
  
  export const warmupRequest = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      // Send a GET request to the '/warmup' endpoint
      const response = await fetch(`${backendUrl}/warmup`);

      // Parse the response as text
      const data = await response.text();

      // Log the response message
      console.log(data);
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Failed to warmup:', error);
    }
  };
