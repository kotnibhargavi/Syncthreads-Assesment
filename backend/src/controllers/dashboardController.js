// Get dashboard data
const getDashboardData = async (req, res) => {
    try {
      // Mock data for dashboard cards
      const dashboardData = {
        cards: [
          {
            id: 'card-1',
            title: 'Delhi',
            description: 'Capital of India',
            imageUrl: 'https://via.placeholder.com/150',
            coordinates: [28.6139, 77.2090],
          },
          {
            id: 'card-2',
            title: 'Mumbai',
            description: 'Financial Capital',
            imageUrl: 'https://via.placeholder.com/150',
            coordinates: [19.0760, 72.8777],
          },
          {
            id: 'card-3',
            title: 'Bangalore',
            description: 'Tech Hub',
            imageUrl: 'https://via.placeholder.com/150',
            coordinates: [12.9716, 77.5946],
          },
          {
            id: 'card-4',
            title: 'Chennai',
            description: 'Cultural Center',
            imageUrl: 'https://via.placeholder.com/150',
            coordinates: [13.0827, 80.2707],
          },
        ],
      };
  
      res.status(200).json(dashboardData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = { getDashboardData };