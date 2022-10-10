import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/RecentlyUpdatedIssues.module.css";

const RecentlyUpdatedIssues = ({mobile}) => {
  const [issueData, setIssueData] = useState({
    
    pageIssue: { results: [] },
    updatedIssues: { results: [] },
  });
  const { updatedIssues } = issueData;
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/issues/?ordering=-updated_at"
        );
        setIssueData((prevState) => ({
          ...prevState,
          updatedIssues: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}>

        {updatedIssues.results.length ? (
          <>
            <p>Recently updated Issues</p>
            {mobile ? (
              <div className="d-flex justify-content-around">
                {updatedIssues.results.slice(0, 3).map((issue) => (
                  <p key={issue.id}>
                    <span>{issue.title}</span>
                    <span className={styles.Spacer}>({issue.journals_count})</span>
                  </p>
                ))}
              </div>
            ) : (
              updatedIssues.results.map((issue) => (
                <p key={issue.id}>
                  <span>{issue.title}</span>
                  <span className={styles.Spacer}>({issue.journals_count})</span>
                  <br />
                  <span className={styles.Time}>Last updated: {issue.updated_at}</span>
                </p>
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