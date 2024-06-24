import { useEffect, useState } from 'react';
import './index.css';
import { IoAdd } from "react-icons/io5";

const ChatList = ({ setSendingName, setSendingProfile, setSendingId, userName, normalUrl }) => {
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/friends');
                const data = await response.json();
                setFriendList(data);
            } catch (e) {
                console.log(e, ': error in fetching');
            }
        };

        fetchData();
    }, []);

    const particularPersonId = (name, profile, id) => {
        setSendingName(name);
        setSendingProfile(profile);
        setSendingId(id)
        console.log(name, profile);
    };

    return (
        <div className='chat-list-main-bg-container'>
            <div className='user-name-caht-list'>
                <img className='image-of-user-in-chatList' src={normalUrl} alt='pics'/>
            <h2>{userName}</h2>
            <IoAdd/>
            </div>
            <ul>
                {friendList.map(item => (
                    <li className='list-of-elements' key={item._id}>
                        <button className='list-of-elements' onClick={() => particularPersonId(item.name, item.profile, item._id)}>
                            <img className='images-of-home-page' src={item.profile} alt='profile'/>
                            <h2>{item.name}</h2>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
