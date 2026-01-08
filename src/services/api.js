const GAS_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export const api = {
  fetchQuestions: async (count = 5) => {
    // If no URL configured, return mock data for testing
    if (!GAS_URL || GAS_URL.includes('REPLACE')) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            question: `This is a mock question #${i + 1}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            answer: 'A' // Mock answer
          })));
        }, 1000);
      });
    }

    // Validation: Check if user pasted the Editor URL instead of Web App URL
    if (GAS_URL.includes('/home/projects/') || !GAS_URL.includes('/macros/s/')) {
      throw new Error('CONFIGURATION ERROR: You pasted the Script Editor URL. Please use the "Web App URL" (ends in /exec) from the Deploy > Manage Deployments menu.');
    }

    const response = await fetch(`${GAS_URL}?action=getQuestions&count=${count}`);
    if (!response.ok) throw new Error('Failed to fetch questions');
    const data = await response.json();
    return data;
  },

  submitScore: async (payload) => {
    if (!GAS_URL || GAS_URL.includes('REPLACE')) {
      console.log('Mock Submit:', payload);
      return { success: true };
    }

    // Google Apps Script Web App standard behavior for POST (needs 'no-cors' sometimes if complicated, 
    // but usually text/plain is easiest to avoid preflight options).
    // We will try standard POST with text/plain body to avoid CORS preflight issues on simple GAS deployments.
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'submitScore',
        ...payload
      }),
    });

    // With no-cors or simple requests, we might get an opaque response.
    // However, GAS usually returns a redirect or JSON.
    // If we use standard mechanism, we expect JSON back.
    if (!response.ok) {
      // Only throw if it's a real HTTP error we can see.
      // pass
    }

    // Return mock success because reading body might fail with CORS issues depending on GAS setup
    // But ideally we parse JSON.
    // Return mock success ONLY if configured to replace
    // Otherwise we want real errors
    try {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error('Invalid JSON response:', text);
        throw new Error('Server returned invalid JSON. Check your URL.');
      }
    } catch (e) {
      console.error('Submission error:', e);
      throw e;
    }
  }
};
