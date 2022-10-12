import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Browse from './pages/Browse';
import Login from './pages/Login';
import LoginSecurityQuestion from './pages/LoginSecurityQuestion';
import Register from './pages/Register';
import WatchList from './pages/WatchList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={client}>
      <Router>
        <>
          <Routes>
            <Route path='/' element={<Browse />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login-via-security-question' element={<LoginSecurityQuestion />} />
            <Route path='/watch-list' element={<WatchList />} />
          </Routes>
        </>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
