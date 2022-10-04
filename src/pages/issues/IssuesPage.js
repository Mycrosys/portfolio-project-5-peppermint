import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Issue from "./Issue";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

function IssuesPage({ message, filter = "" }) {
  const [issues, setIssues] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data } = await axiosReq.get(`/issues/?${filter}`);
        setIssues(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchIssues();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Recent Issue Updates for mobile</p>
        {hasLoaded ? (
          <>
            {issues.results.length ? (
              issues.results.map((issue) => (
                <Issue key={issue.id} {...issue} setIssues={setIssues} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Recent Issue Updates for desktop</p>
      </Col>
    </Row>
  );
}

export default IssuesPage;
