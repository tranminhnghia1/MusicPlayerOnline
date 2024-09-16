import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

function App() {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  // const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
  //   useStateValue();
  // const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    // setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
          //window.localStorage.setItem("auth", "true");
          // validateUser(token).then((data) => {
          //   dispatch({
          //     type: actionType.SET_USER,
          //     user: data,
          //   });
          // });
        });
        // setIsLoading(false);
      } else {
        setAuth(false);
        // dispatch({
        //   type: actionType.SET_USER,
        //   user: null,
        // });
        // setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center">
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
