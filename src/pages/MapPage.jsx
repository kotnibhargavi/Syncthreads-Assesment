import { Box } from '@mui/material';
import Header from '../components/Layout/Header';
import MapView from '../components/Map/MapView';

const MapPage = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ py: 4 }}>
        <MapView />
      </Box>
    </Box>
  );
};

export default MapPage;