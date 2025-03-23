import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  IconButton, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mapService } from '../../api/api';

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Map controller component for changing view
const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

// Zoom controls component
const ZoomControls = () => {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
  };
  
  return (
    <Box className="map-controls">
      <IconButton 
        className="map-control-button"
        onClick={handleZoomIn}
        aria-label="Zoom in"
      >
        <AddIcon />
      </IconButton>
      <IconButton 
        className="map-control-button"
        onClick={handleZoomOut}
        aria-label="Zoom out"
      >
        <RemoveIcon />
      </IconButton>
    </Box>
  );
};

const MapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mapConfig, setMapConfig] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        // First get the default map config
        const config = await mapService.getMapConfig();
        setMapConfig(config);
        
        // If we have a location ID, fetch that specific location
        if (id) {
          const locationData = await mapService.getLocationById(id);
          setLocation(locationData);
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
        setError(
          error.response?.data?.message || 'Failed to load map data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!mapConfig) {
    return (
      <Container>
        <Alert severity="error">
          Unable to load map configuration. Please try again later.
        </Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mt: 2 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mr: 2 }}>
          Back
        </Button>
        <Typography variant="h4" component="h1">
          {location ? location.name : 'India Map'}
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {location && (
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">
            {location.description}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {location.details}
          </Typography>
        </Paper>
      )}
      
      <Paper elevation={3} className="map-container">
        <MapContainer
          center={location ? location.coordinates : mapConfig.center}
          zoom={location ? location.zoom : mapConfig.zoom}
          maxZoom={mapConfig.maxZoom}
          minZoom={mapConfig.minZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {location && (
            <Marker position={location.coordinates}>
              <Popup>
                <div>
                  <h3>{location.name}</h3>
                  <p>{location.description}</p>
                </div>
              </Popup>
            </Marker>
          )}
          
          <MapController 
            center={location ? location.coordinates : mapConfig.center} 
            zoom={location ? location.zoom : mapConfig.zoom} 
          />
          
          <ZoomControls />
        </MapContainer>
      </Paper>
    </Container>
  );
};

export default MapView;