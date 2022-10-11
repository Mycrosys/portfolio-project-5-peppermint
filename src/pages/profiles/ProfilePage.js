import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import RecentlyUpdatedIssues from "../issues/RecentlyUpdatedIssues";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";

import { Image } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";
import Issue from "../issues/Issue";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profileIssues, setProfileIssues] = useState({ results: [] });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileIssues }] = 
        await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/issues/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileIssues(profileIssues);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={6} className="my-2">
              <div>{profile?.issues_count}</div>
              <div>Issues Created</div>
            </Col>
            <Col xs={6} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following Issues</div>
            </Col>
          </Row>
        </Col>
        {profile?.description && <Col className="p-3">{profile.description}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s bug reports</p>
      <hr />
      {profileIssues.results.length ? (
        <InfiniteScroll
          children={profileIssues.results.map((issue) => (
            <Issue key={issue.id} {...issue} setIssues={setProfileIssues} />
          ))}
          dataLength={profileIssues.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileIssues.next}
          next={() => fetchMoreData(profileIssues, setProfileIssues)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <RecentlyUpdatedIssues mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <RecentlyUpdatedIssues />
      </Col>
    </Row>
  );
}

export default ProfilePage;