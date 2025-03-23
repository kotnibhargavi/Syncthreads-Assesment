// Get map configuration
const getMapConfig = async (req, res) => {
    try {
      // Configuration for India map
      const mapConfig = {
        center: [20.5937, 78.9629], // Geographical center of India
        zoom: 5,
        maxZoom: 18,
        minZoom: 3,
      };
  
      res.status(200).json(mapConfig);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get location details by ID
  const getLocationById = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Mock data for different locations
      const locations = {
        'card-1': {
          name: 'Delhi',
          coordinates: [28.6139, 77.2090],
          description: 'National Capital Territory of India',
          zoom: 12,
          details: 'Delhi is the capital of India and an important political, commercial, and cultural center.'
        },
        'card-2': {
          name: 'Mumbai',
          coordinates: [19.0760, 72.8777],
          description: 'Financial Capital of India',
          zoom: 12,
          details: 'Mumbai is the financial, commercial, and entertainment capital of India.'
        },
        'card-3': {
          name: 'Bangalore',
          coordinates: [12.9716, 77.5946],
          description: 'Tech Hub of India',
          zoom: 12,
          details: 'Bangalore is known as the Silicon Valley of India and is a major IT hub.'
        },
        'card-4': {
          name: 'Chennai',
          coordinates: [13.0827, 80.2707],
          description: 'Cultural Center of South India',
          zoom: 12,
          details: 'Chennai is a major cultural, economic and educational center in South India.'
        },
      };
      
      if (!locations[id]) {
        return res.status(404).json({ message: 'Location not found' });
      }
      
      res.status(200).json(locations[id]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = { getMapConfig, getLocationById };