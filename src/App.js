import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Fileuplode from './page/Fileuplode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Fileuplode /> }/>
      </Routes>
    </Router>
  );
}

export default App;
