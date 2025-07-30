import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Get the path from the request
    const path = req.query.path || 'index.html';
    
    // Read the file from frontend/dist
    const filePath = join(process.cwd(), 'frontend', 'dist', path);
    const content = readFileSync(filePath, 'utf8');
    
    // Set appropriate content type
    if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
    
    res.status(200).send(content);
  } catch (error) {
    console.error('Error serving frontend:', error);
    res.status(404).send('File not found');
  }
}