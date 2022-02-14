import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './pages/Welcome';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Recoard from './pages/Recoard';
import Category from './pages/Category';
import InforCard from './components/cards/InforCard';
import Test from './components/test';


function App() {
  return (
    <AuthProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="accounts" element={<Home />} />
            <Route path="accounts" >
              <Route path=":account" element={<Dashboard />} >
                <Route path="" element={<InforCard />} />
                <Route path="category" element={<Category />} />
                <Route path="recoard" element={<Recoard />} />
              </Route>
            </Route>
            <Route path="*" element={<><p>Not Found</p></>} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </AuthProvider>
  );
}

export default App;
