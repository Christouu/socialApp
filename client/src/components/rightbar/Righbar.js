import React, { useContext, useEffect, useState } from "react";
import "./Rightbar.css";

import Online from "../online/Online";
import { Users } from "../../dummyData";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Righbar({ profile }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.following.includes(profile?._id));
  }, [currentUser, profile?._id]);

  useEffect(() => {
    if (profile) {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friends/" + profile?._id);
          setFriends(friendList.data);
        } catch (error) {
          console.log(error);
        }
      };
      getFriends();
    }
  }, [profile]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${profile._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: profile._id });
      } else {
        await axios.put(`/users/${profile._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: profile._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pesho</b> and <b>Kiro</b> have birthday today.
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAdd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightBarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {profile.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{profile.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{profile.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {profile.relationship === 1
                ? "Single"
                : profile.relationship === 2
                ? "Married"
                : "In relationship"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((f) => (
            <Link
              to={`/profile/${f.username}`}
              style={{ textDecoration: "none" }}
              key={f._id}
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    f.profilePicture
                      ? PF + f.profilePicture
                      : PF + "person/download.jpg"
                  }
                  alt=""
                />
                <span className="rightbarFollowingUsername">{f.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
