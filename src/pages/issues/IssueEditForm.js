import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/IssueCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import moment from "moment";


function IssueEditForm() {
  const [errors, setErrors] = useState({});

  const [issueData, setIssueData] = useState({
    title: "",
    description: "",
    image: "",
    due_date: "",
    priority: "",
    category: "",
    state: "",
    overdue: "",
  });

  const { 
    title,
    description,
    image,
    due_date,
    priority,
    category,
    state,
    overdue,
    } = issueData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/issues/${id}/`);
        
        // Converting Time into a Format usable by the form
        // with moments.js
        data.due_date = moment(data.due_date).format('YYYY-MM-DDThh:mm');

        const {
          title,
          description,
          image,
          due_date,
          priority,
          category,
          state,
          overdue,
          is_owner } = data;
        
        is_owner ? setIssueData({
          title,
          description,
          image,
          due_date,
          priority,
          category,
          state,
          overdue
        }) : history.push("/");

      } catch (err) {
        
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setIssueData({
      ...issueData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setIssueData({
        ...issueData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    formData.append("due_date", due_date);
    formData.append("priority", priority);
    formData.append("category", category);
    formData.append("state", state);
    formData.append("overdue", overdue);

    try {
      await axiosReq.put(`/issues/${id}/`, formData);
      history.push(`/issues/${id}`);
    } catch (err) {
      
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

    </div>
  );

  const selectFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="due_date"
          placeholder="Due Date"
          value={due_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.due_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={priority}
          onChange={handleChange}>
          <option value="LOW">Low</option>
          <option value="MID">Mid</option>
          <option value="HGH">High</option>
          <option value="CRT">Critical</option>
        </Form.Control>
      </Form.Group>
      {errors?.priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={handleChange}>
          <option value="BUG">Bug</option>
          <option value="NAB">Not a Bug</option>
          <option value="DUP">Duplicate</option>
          <option value="WFX">Won't Fix</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Control
          as="select"
          name="state"
          value={state}
          onChange={handleChange}>
          <option value="OPN">Open</option>
          <option value="ASN">Assigned</option>
          <option value="CLS">Closed</option>
        </Form.Control>
      </Form.Group>
      {errors?.state?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Overdue</Form.Label>
        <Form.Control
          as="select"
          name="overdue"
          value={overdue}
          onChange={handleChange}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </Form.Control>
      </Form.Group>
      {errors?.overdue?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <br />

      <Button
        className={`${btnStyles.Button} ${btnStyles.Green}`}
        onClick={() => history.goBack()}>
        Cancel
      </Button>
      
      <Button className={`${btnStyles.Button} ${btnStyles.Green}`} type="submit">
        Update
      </Button>
      
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={8} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
            {textFields}
            
            <Form.Group className="text-center">
              
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Green} btn`}
                  htmlFor="image-upload">
                  Change the Image/Screenshot
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}/>
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{selectFields}</div>
          </Container>
        </Col>
        <Col md={4} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={`${appStyles.Content} ${styles.Container}`}>{selectFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default IssueEditForm;