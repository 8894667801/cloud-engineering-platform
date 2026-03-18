import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import IdentityAccess from './pages/IdentityAccess';
import DeviceManagement from './pages/DeviceManagement';
import SecurityDashboard from './pages/SecurityDashboard';
import AwsCloud from './pages/AwsCloud';
import SupportPage from './pages/SupportPage';
import SupportBot from './components/SupportBot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="identity" element={<IdentityAccess />} />
          <Route path="devices" element={<DeviceManagement />} />
          <Route path="security" element={<SecurityDashboard />} />
          <Route path="aws" element={<AwsCloud />} />
          <Route path="support" element={<SupportPage />} />
        </Route>
      </Routes>
      <SupportBot />
    </Router>
  );
}

export default App;
