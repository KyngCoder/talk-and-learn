import { Button, ButtonGroup } from '@chakra-ui/react'
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import {Routes,Route,} from 'react-router-dom'
import ParticleBackground from './components/particleBackground';


function App() {
  return (
    <div className="app">
    <Routes>
          <Route path="/" element={<HomePage/>} exact />
          <Route path="/chats" element={<ChatPage />} exact />
        </Routes>
     {/* <ParticleBackground  className="particle"/> */}
        
     
    </div>
  );
}

export default App;
