import { Box } from '@mui/material';
import Header from '../components/Layout/Header';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ py: 4 }}>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default DashboardPage;