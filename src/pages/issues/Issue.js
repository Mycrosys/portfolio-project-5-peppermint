import React from "react";
import styles from "../../styles/Issue.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";


const Issue = (props) => {
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
    overdue,
    updated_at,
    issuePage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

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
            
            {is_owner && issuePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}/>
            )}

          </div>

        </Media>
      </Card.Body>

      <Card.Body>
        {!overdue && <Card.Text className={styles.overdue}>Overdue!</Card.Text>}
        {title && <Card.Title>{title}</Card.Title>}
        Summary: {description && <Card.Text>{description}</Card.Text>}
      </Card.Body>
      
      <Link to={`/issues/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      
      <Card.Body>
        {due_date && <Card.Text>Due Date: {due_date}</Card.Text>}
        {priority && <Card.Text>Priority: {priority}</Card.Text>}
        {category && <Card.Text>Category: {category}</Card.Text>}
        {state && <Card.Text>State: {state}</Card.Text>}

        <div className={styles.IssueBar}>
          <Link to={`/issues/${id}`}>
            <i className="fa fa-book" />
          </Link>
          {journals_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Issue;