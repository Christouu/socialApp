import React from "react";
import "./Messege.css";
import { format } from "timeago.js";

export default function Messege({ message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const friendId = message.sender;
  //     try {
  //       const res = await axios.get(`/users?userId=${friendId}`);
  //       setUser(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, [message.sender]);

  return (
    <div className={own ? "messege own" : "messege"}>
      <div className="messageTop">
        <img src={PF + "person/download.jpg"} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
