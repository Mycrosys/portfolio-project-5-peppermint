import { axiosReq } from "../api/axiosDefaults";

// Required function to load more data for Infinitescroll
// when the limit of currently displayed data is reached
// (which is 10 in this project)

// also checks for duplicates and omits them

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

// Deconstructed for future possible use for stats

export const followHelper = (issue, clickedIssue, following_id) => {
  return issue.id === clickedIssue.id
    ? // Clicked Issue, add following id
      {
        ...issue,
        following_id,
      }
    : issue.is_owner
    ? // Issue owned by owner
      {
        ...issue,
      }
    : issue;
};

// Deconstructed for future possible use for stats

export const unfollowHelper = (issue, clickedIssue) => {
  return issue.id === clickedIssue.id
    ? // Issue clicked on, remove following id
      {
        ...issue,
        following_id: null,
      }
    : issue.is_owner
    ? // Issue owned by owner, same as above with followhelper
      {
        ...issue,
      }
    : issue;
};