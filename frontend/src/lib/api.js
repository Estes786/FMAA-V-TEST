// API configuration and helper functions
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const HUGGINGFACE_URL = import.meta.env.VITE_HUGGINGFACE_URL || 'https://api-inference.huggingface.co';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
export const HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;

class ApiClient {
  constructor(baseURL = API_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }

  // Sentiment Analysis API
  async getSentimentAnalyses(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/sentiment-agent?${searchParams}`);
  }

  async analyzeSentiment(text) {
    return this.request('/sentiment-agent', {
      method: 'POST',
      body: { text },
    });
  }

  // Recommendations API
  async getRecommendations(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/recommendation-agent?${searchParams}`);
  }

  async generateRecommendations(data) {
    return this.request('/recommendation-agent', {
      method: 'POST',
      body: data,
    });
  }

  // Performance Metrics API
  async getPerformanceMetrics(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/performance-monitor?${searchParams}`);
  }

  async recordPerformanceMetric(data) {
    return this.request('/performance-monitor', {
      method: 'POST',
      body: data,
    });
  }

  // Agent Factory API
  async getAgents(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request(`/agent-factory?${searchParams}`);
  }

  async createAgent(data) {
    return this.request('/agent-factory', {
      method: 'POST',
      body: data,
    });
  }

  async updateAgent(data) {
    return this.request('/agent-factory', {
      method: 'PUT',
      body: data,
    });
  }

  async deleteAgent(id) {
    return this.request(`/agent-factory/${id}`, {
      method: 'DELETE',
    });
  }

  // HuggingFace API
  async callHuggingFace(model, data) {
    const url = `${HUGGINGFACE_URL}/models/${model}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (HUGGINGFACE_TOKEN) {
      headers['Authorization'] = `Bearer ${HUGGINGFACE_TOKEN}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    return await response.json();
  }

  // Supabase API (if needed)
  async callSupabase(table, action, data = {}) {
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase configuration missing');
    }

    const url = `${SUPABASE_URL}/rest/v1/${table}`;
    const headers = {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    };

    const response = await fetch(url, {
      method: action,
      headers,
      body: action !== 'GET' ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status}`);
    }

    return await response.json();
  }
}

// Create and export a default instance
const apiClient = new ApiClient();
export default apiClient;