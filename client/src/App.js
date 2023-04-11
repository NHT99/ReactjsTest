import './App.css';
import CreateSector from './Sectors/CreateSector';
import { Routes, Route } from "react-router-dom"
import UserInfo from './UserInfo/UserInfo';
import "./scss/style.scss";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateSector/>}/>
        <Route path="userInfo" element={<UserInfo/>}/>
      </Routes>
        
    </div>
  );
}

export default App;
