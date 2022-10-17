import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Issue from "./Issue";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/IssuesPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import RecentlyUpdatedIssues from "./RecentlyUpdatedIssues";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function IssuesPage({ message, filter = "" }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [issues, setIssues] = useState({ results: [] });
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const { data } = await axiosReq.get(`/issues/?${filter}search=${query}`);
        setIssues(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchIssues();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <RecentlyUpdatedIssues mobile />
        
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}>
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search issues"
          />
        </Form>

        {hasLoaded ? (
          <>
            {issues.results.length ? (
              
              <InfiniteScroll
                children={issues.results.map((issue) => (
                  <Issue key={issue.id} {...issue} setIssues={setIssues} />
                ))}
                dataLength={issues.results.length}
                loader={<Asset spinner />}
                hasMore={!!issues.next}
                next={() => fetchMoreData(issues, setIssues)}
              />

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
        <RecentlyUpdatedIssues />
      </Col>
    </Row>
  );
}

export default IssuesPage;
