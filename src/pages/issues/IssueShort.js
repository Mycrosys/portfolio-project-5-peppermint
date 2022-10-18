import React from "react";
import styles from "../../styles/IssueShort.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Button from "react-bootstrap/Button";
import { useSetIssueData } from "../../contexts/IssueDataContext";
import { Link } from "react-router-dom";

// This Component is used for creating small-sized Issue
// displays with a follow/unfollow button in recently
// updated Issues Side-display

const IssueShort = (props) => {
  const { issue, mobile } = props;
  const { following_id, id, owner, title, updated_at, journals_count } = issue;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetIssueData();

  // Don't render follow/unfollow Buttons on mobile and limit
  // to a display of 2 Issues on top of the search bar and main
  // content display
  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>

      <Link className={`mx-2 ${styles.Break} ${mobile && styles.Mobilebreak}`} to={`/issues/${id}`}>
        <span>({journals_count})</span>&nbsp;{title}
        <br />
        <span className={styles.Spacer}>{updated_at}</span>
      </Link>
      
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Lightgreen}`}
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