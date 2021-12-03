import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversations.css";

export default function Conversations({ data, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = data.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser._id, data]);

  return (
    <div className="conversations">
      <img
        src={user?.coverPicture || PF + "person/download.jpg"}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
