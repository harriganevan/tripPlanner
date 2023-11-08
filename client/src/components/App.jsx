import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Header from '../components/Header.jsx';
import Trips from '../pages/Trips.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import LoadingPage from './LoadingPage.jsx';
import useAuthContext from '../hooks/useAuthContext.jsx';
import { useEffect, useState } from 'react';

function App() {

  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/trips'
          element={loading ? <LoadingPage /> : user ? <Trips /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/login'
          element={loading ? <LoadingPage /> : !user ? <Login /> : <Navigate to={'/'} />}
        />
        <Route
          path='/signup'
          element={<Signup />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
