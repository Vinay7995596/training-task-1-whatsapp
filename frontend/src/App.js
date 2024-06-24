import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Newform from './components/LoginPage';
import Home from './components/Home';

function App() {
  const [userName, setUserName] = useState('');
  const [normalUrl, setUrlProfile] = useState('')
  const [userIdloginPerson, setUserIdloginPerson] = useState('')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Newform setUserName={setUserName} setUrlProfile={setUrlProfile} setUserIdloginPerson={setUserIdloginPerson} />} />
          <Route path='/home' element={<Home userName={userName} normalUrl={normalUrl} userIdloginPerson={userIdloginPerson} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
