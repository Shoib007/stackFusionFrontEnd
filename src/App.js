import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import UserPage from './UserPage';

function App() {
  return (
    <Router>

      <div className="App">
        <Routes>
          <Route path="/" element={<Registration />}/>
          <Route path='/users' element={<UserPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
