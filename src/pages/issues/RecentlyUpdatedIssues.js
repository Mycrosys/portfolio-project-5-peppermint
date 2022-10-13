import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useIssueData } from "../../contexts/IssueDataContext";
import IssueShort from "./IssueShort";

const RecentlyUpdatedIssues = ({mobile}) => {
  const { updatedIssues } = useIssueData();
  
  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}>

        {updatedIssues.results.length ? (
          <>
            <p>Recently updated Issues</p>
            <hr />
            {mobile ? (
              <div className="d-flex justify-content-around">
                {updatedIssues.results.slice(0, 3).map((issue) => (
                  <IssueShort key={issue.id} issue={issue} mobile />
                ))}
              </div>
            ) : (
              updatedIssues.results.map((issue) => (
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