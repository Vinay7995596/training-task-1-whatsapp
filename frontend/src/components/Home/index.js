import React, { useState } from 'react';
import ChatList from '../ChatList';
import './index.css';
import ChatHistory from '../ChatHistory';

const Home = ({ userName, normalUrl, userIdloginPerson }) => {
    const [sendingName, setSendingName] = useState('');
    const [sendingProfile, setSendingProfile] = useState('');
    const [sendingId, setSendingId] = useState('')

    return (
        <div className='total-main-chat-friend-list'>
            <ChatHistory className="chat-history-container-place" sendingName={sendingName} sendingProfile={sendingProfile} sendingId={sendingId} userIdloginPerson={userIdloginPerson}/>
            <ChatList className="chat-list-friend-place" setSendingId={setSendingId} setSendingName={setSendingName} setSendingProfile={setSendingProfile} userName={userName} normalUrl={normalUrl}  />
        </div>
    );
};

export default Home;
