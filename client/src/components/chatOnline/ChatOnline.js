import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`/users/friends/${currentId}`);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
          key={o._id}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : PF + "person/download.jpg"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineUsername">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
