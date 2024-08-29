import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import QRcodeScanner from './home';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<QRcodeScanner />}/>

      </Routes>
    </div>
  )
}

export default App;
