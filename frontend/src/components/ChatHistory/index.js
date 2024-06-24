import { useEffect, useState } from 'react';
import './index.css';

const ChatHistory = ({ sendingName, sendingProfile, sendingId,userIdloginPerson  }) => {

    const [userTextSending, newuserTextSending] = useState('')
    const [chattingDataGetting, setChattingDataGetting] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/chattingOfData');
                const data = await response.json();
                setChattingDataGetting(data);
                console.log(data);
            } catch (e) {
                console.log(e, ': error in frontend fetching of user chat data');
            }
        };

        fetchData();
        console.log(userIdloginPerson)
    }, []);


    const userChatText = (e) => {
        newuserTextSending(e.target.value)
    }

    const textStoringDtabase = async () => {
        const userSendingDataINText = {
            sendingYou: true,
            chatId : userIdloginPerson,
            senderId: sendingId,
            text:userTextSending
        }
        try {
            const response = await fetch('http://localhost:5000/chatstored', {
                method: 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(userSendingDataINText)
            })

            if(response.ok) {
                const data = await response.json()
                console.log(data)
                newuserTextSending('')
            }
            
        }
        catch(e) {
            console.log(e, ':error in user sending message in frontend')
        }
       
    }
    return (
        <div className='chat-history-component-main-bg-container'>
            <nav>
                <div className='chat-history-profile-container'>
                    <img className='profile-picture-chat-history' src={sendingProfile || 'https://th.bing.com/th/id/OIP.Eif37cBwT_mfc-BCXYWrXQHaHa?rs=1&pid=ImgDetMain'} alt='profile'/>
                    <h2>{sendingName || 'select friend'}</h2>
                </div>
            </nav>
            <div className='chat-history-middle'>
            {chattingDataGetting.filter(items => items.senderId === sendingId && items.chatId === userIdloginPerson ).map(filteredItem => {
                return (
                    <h2 className={filteredItem.sendingYou ? 'chat-displayed-in-chatbox' : 'chat-displayed-in-chatbox-right' } key={filteredItem.id}>{filteredItem.text}</h2>
                );
            })}
            </div>
            <div>
                <div className='inputs-text-chat-history'>
                    <input className='input-field-chat-history' value={userTextSending} onChange={userChatText} type='text' placeholder='Enter Text'/>
                    <button className='send-button-chat-history' onClick={textStoringDtabase}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatHistory;
