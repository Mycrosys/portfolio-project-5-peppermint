import React from "react";
import styles from "../../styles/IssueShort.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button } from "react-bootstrap";
import { useSetIssueData } from "../../contexts/IssueDataContext";

const IssueShort = (props) => {
  const { issue, mobile } = props;
  const { following_id, owner, title } = issue;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetIssueData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
            
      <div className={`mx-2 ${styles.Break}`}>
        {title}
      </div>
      
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Green}`}
              onClick={() => handleUnfollow(issue)}>
              Unfollow
            </Button>
          ) : (
            
            <Button
              className={`${btnStyles.Button} ${btnStyles.Green}`}
              onClick={() => handleFollow(issue)}>
              Follow
            </Button>

          ))}
      </div>
    </div>
  );
};

export default IssueShort;