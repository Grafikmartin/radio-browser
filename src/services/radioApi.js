// src/services/radioApi.js

// Direkte Verwendung der Radio-Browser API
const BASE_URL = 'https://de1.api.radio-browser.info/json';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const radioApi = {
  // Sender suchen mit Filtern
  searchStations: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.country) params.append('country', filters.country);
    if (filters.language) params.append('language', filters.language);
    if (filters.tag) params.append('tag', filters.tag);
    if (filters.codec) params.append('codec', filters.codec);
    if (filters.minBitrate) params.append('bitrateMin', filters.minBitrate);
    
    params.append('limit', '100');
    
    const headers = {
      'User-Agent': 'RadioBrowserApp/1.0',
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${BASE_URL}/stations/search?${params}`, { 
      headers,
      mode: 'cors'
    });
    return handleResponse(response);
  },

  // Beliebte Sender abrufen
  getPopularStations: async (limit = 20) => {
    const headers = {
      'User-Agent': 'RadioBrowserApp/1.0',
      'Content-Type': 'application/json'
    };
    
    // Korrigierter Endpunkt für beliebte Sender
    const response = await fetch(`${BASE_URL}/stations/topclick/${limit}`, { 
      headers,
      mode: 'cors'
    });
    return handleResponse(response);
  },

  // Zufällige Sender
  getRandomStations: async (limit = 10) => {
    const headers = {
      'User-Agent': 'RadioBrowserApp/1.0',
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${BASE_URL}/stations/search?order=random&limit=${limit}`, { 
      headers,
      mode: 'cors'
    });
    return handleResponse(response);
  },

  // Aktuelle Songinfo abrufen
  getCurrentTrack: async (stationId) => {
    const headers = {
      'User-Agent': 'RadioBrowserApp/1.0',
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${BASE_URL}/stations/byuuid/${stationId}`, { 
      headers,
      mode: 'cors'
    });
    return handleResponse(response);
  },

  // Sender bewerten
  voteStation: async (stationId, type = 'up') => {
    const headers = {
      'User-Agent': 'RadioBrowserApp/1.0',
      'Content-Type': 'application/json'
    };
    
    const endpoint = type === 'up' ? 'vote' : 'unvote';
    const response = await fetch(`${BASE_URL}/stations/${stationId}/${endpoint}`, { 
      method: 'POST',
      headers,
      mode: 'cors'
    });
    return handleResponse(response);
  }
};
