
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar/Navbar';
import Home from './pages/Home/Home';
import Coin from './pages/coin/Coin';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
      </Routes>
    </div>
  );
}

export default App;
