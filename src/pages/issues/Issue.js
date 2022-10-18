import React from "react";
import styles from "../../styles/Issue.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

import btnStyles from "../../styles/Button.module.css";
import { useSetIssueData } from "../../contexts/IssueDataContext";


const Issue = (props) => {
  const issue = props;

  const {
    id,
    owner,
    profile_id,
    profile_image,
    journals_count,
    title,
    description,
    image,
    due_date,
    priority,
    category,
    state,
    issuePage,
    overdue,
    updated_at,
    following_id,
  } = issue;

     
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const { handleFollow, handleUnfollow } = useSetIssueData();

  const handleEdit = () => {
    history.push(`/issues/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/issues/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card className={styles.Issue}>
      
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={50} />
            {owner}
          </Link>
          
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
          </div>
          
          <div className={styles.Buttonspacer}>
            {currentUser &&
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
        </Media>
      </Card.Body>

      <Card.Body>
        {title && <Card.Title>
          <Link to={`/issues/${id}`} className={styles.Title}>{title}</Link>
          {is_owner && issuePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}/>
            )}
        </Card.Title>}

        {overdue && <div className={styles.Overdue}>Issue is Overdue!</div>}
        {due_date && <div>Due Date: {due_date}</div>}
        <hr />
        Description: {description && <Card.Text>{description}</Card.Text>}
      </Card.Body>
      
      <Card.Img className={styles.Cardimage} src={image} alt={title} />
      
      <Card.Body>
        {priority && <span className={styles.Informationspacer}>
          Priority: {priority}</span>}
        {category && <span className={styles.Informationspacer}>
          Category: {category}</span>}
        {state && <span className={styles.Informationspacer}>
          State: {state}</span>}
        {!issuePage && (
          <div className={styles.Journalspacer}>
            <i className="fa fa-book" />{journals_count}
          </div>    
        )}
      </Card.Body>
    </Card>
  );
};

export default Issue;