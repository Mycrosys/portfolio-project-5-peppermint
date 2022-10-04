import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Issue from "./Issue";


function IssuePage() {
  const { id } = useParams();
  const [issue, setIssue] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: issue }] = await Promise.all([
          axiosReq.get(`/issues/${id}`),
        ]);
        setIssue({ results: [issue] });
        console.log(issue);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Recent Issue Updates for mobile</p>
        <Issue {...issue.results[0]} setIssues={setIssue} issuePage />
        <Container className={appStyles.Content}>Journal</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Recent Issue Updates for desktop
      </Col>
    </Row>
  );
}

export default IssuePage;