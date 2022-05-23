import Header from "./Headers/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/ProfileView.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCards from "./Cards/ReviewCards"


function ProfileView(props) {
  const location = useLocation();

  let { username } = useParams();

  let navigate = useNavigate();

  console.log(props.userData)

  useEffect(() => {
    console.log(username)
    if (username){
      // if (username === localStorage.getItem('username')){
        props.handleUser(username)
      // }
      // else{
      //   console.log("username does not match")
      //   navigate("/errorpage")
      // }
  }

  }, username)


  function Submit() {
    props.handleSubmit();
  }

  if (props.userData){
  return (
    <div>
      <Header
        userData={props.userData}
        butName={"Edit Profile"}
        toForm={props.toForm}
        handleSubmit={() => Submit()}
      />
      <header>Reviews</header>
      <ReviewCards reviewData = {props.userData.reviews}/>

      <button value="toPages" onClick={() => props.toPages(props.userData)}>
        View Pages
      </button>
    </div>
  );
  }
  else{
    return (
        <>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </>
      );
  }
}

export default ProfileView;