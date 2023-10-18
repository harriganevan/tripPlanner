import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx'
import Header from '../components/Header.jsx';
import Trips from '../pages/Trips.jsx'

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
      </Routes>
    </BrowserRouter>
  );
}

export default App
