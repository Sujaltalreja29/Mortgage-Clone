import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import MortgageCalculator from './pages/MortgageCalculator';
import Start from './pages/Start';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="calculator" element={<MortgageCalculator />} />
          <Route path="start" element={<Start />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;