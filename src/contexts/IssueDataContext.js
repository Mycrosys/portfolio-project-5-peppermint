import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

// Provides the Project with issue data

const IssueDataContext = createContext();
const SetIssueDataContext = createContext();

export const useIssueData = () => useContext(IssueDataContext);
export const useSetIssueData = () => useContext(SetIssueDataContext);

export const IssueDataProvider = ({ children }) => {
  const [issueData, setIssueData] = useState({
    pageIssue: { results: [] },
    updatedIssues: { results: [] },
  });

  const currentUser = useCurrentUser();

  // Handles the Following of an Issue
  const handleFollow = async (clickedIssue) => {
    try {
        const { data } = await axiosRes.post("/followers/", {
        issue_following: clickedIssue.id,
      });

      // Creates a refresh for the React component
      setIssueData((prevState) => ({
        ...prevState,
        pageIssue: {
          ...prevState.pageIssue,
          results: prevState.pageIssue.results.map((issue) =>
            followHelper(issue, clickedIssue, data.id)
          ),
        },
        updatedIssues: {
          ...prevState.updatedIssues,
          results: prevState.updatedIssues.results.map((issue) =>
            followHelper(issue, clickedIssue, data.id)
          ),
        },
      }));
    } catch (err) {
      
    }
  };

  // Handles the Unfollowing of an Issue
  const handleUnfollow = async (clickedIssue) => {
    try {
      await axiosRes.delete(`/followers/${clickedIssue.following_id}/`);

      // Creates a refresh for the React component
      setIssueData((prevState) => ({
        ...prevState,
        pageIssue: {
          results: prevState.pageIssue.results.map((issue) =>
            unfollowHelper(issue, clickedIssue)
          ),
        },
        updatedIssues: {
          ...prevState.updatedIssues,
          results: prevState.updatedIssues.results.map((issue) =>
            unfollowHelper(issue, clickedIssue)
          ),
        },
      }));
    } catch (err) {
      
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/issues/?ordering=-updated_at");
        setIssueData((prevState) => ({
          ...prevState,
          updatedIssues: data,
        }));
      } catch (err) {
        
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <IssueDataContext.Provider value={issueData}>
      <SetIssueDataContext.Provider
        value={{setIssueData,
                handleFollow,
                handleUnfollow }}>
        {children}
      </SetIssueDataContext.Provider>
    </IssueDataContext.Provider>
  );
};
