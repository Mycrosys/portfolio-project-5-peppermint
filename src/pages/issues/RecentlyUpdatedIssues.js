import React from "react";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useIssueData } from "../../contexts/IssueDataContext";
import styles from "../../styles/RecentlyUpdatedIssues.module.css";
import IssueShort from "./IssueShort";

// Handles the Recently Updated Issue display with follow/unfollow
// Buttons on the right side of the Page
const RecentlyUpdatedIssues = ({mobile}) => {
  const { updatedIssues } = useIssueData();
  
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}>

        {updatedIssues.results.length ? (
          <>
            <p className={styles.Header}>Recently updated Issues</p>
            <hr />
            {mobile ? (
              <div className="d-flex justify-content-around">
                {updatedIssues.results.slice(0, 2).map((issue) => (
                  <IssueShort key={issue.id} issue={issue} mobile />
                ))}
              </div>
            ) : (
              updatedIssues.results.slice(0, 10).map((issue) => (
                <IssueShort key={issue.id} issue={issue} />
              ))  
            )}
          </>
        ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default RecentlyUpdatedIssues;