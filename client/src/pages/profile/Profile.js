import "./Profile.css";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Righbar from "../../components/rightbar/Righbar";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);

  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${params.username}`);
      setUser(res.data);
    };

    fetchUser();
  }, [params.username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF + "person/gray.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || PF + "person/download.jpg"}
                alt=""
              />
            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <Righbar profile={user} />
          </div>
        </div>
      </div>
    </>
  );
}
