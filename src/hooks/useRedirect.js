import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

// Handles redirects to Home Page if the User is on a page he
// or she is not supposed to be

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        
        // User logged in
        
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        
        // User not logged in
        
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
