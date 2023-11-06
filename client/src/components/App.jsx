import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Header from '../components/Header.jsx';
import Trips from '../pages/Trips.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';

function App() {

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
          element={<Trips />}
        />
        <Route
          path='/login'
          element={<Login />}
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
