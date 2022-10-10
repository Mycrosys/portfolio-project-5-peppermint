import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Issue from "./Issue";
import Journal from "../journals/Journal";

import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import RecentlyUpdatedIssues from "./RecentlyUpdatedIssues";

function IssuePage() {
  const { id } = useParams();
  const [issue, setIssue] = useState({ results: [] });
  const [journal, setJournals] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: issue }, { data: journal }] = await Promise.all([
          axiosReq.get(`/issues/${id}`),
          axiosReq.get(`/journal/?issue=${id}`)
        ]);
        setIssue({ results: [issue] });
        setJournals(journal);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <RecentlyUpdatedIssues mobile />
        {issue.results.length ? (
          <>
            <Issue {...issue.results[0]} setIssues={setIssue} issuePage />
        
            <Container className={appStyles.Content}>
              <span>This issue has {journal.results.length} Journal entries.</span>
              <InfiniteScroll
                  children={journal.results.map((journal) => (
                    <Journal
                      key={journal.id}
                      {...journal}
                      setIssue={setIssue}
                      setJournals={setJournals}
                    />
                  ))}
                  dataLength={journal.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!journal.next}
                  next={() => fetchMoreData(journal, setJournals)}
                />
            </Container>
          </>
        ) : 
          <>
            <Container className={appStyles.Content}>
              <span>This issue has been deleted.</span>
            </Container>
          </>
        }
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <RecentlyUpdatedIssues />
      </Col>
    </Row>
  );
}

export default IssuePage;