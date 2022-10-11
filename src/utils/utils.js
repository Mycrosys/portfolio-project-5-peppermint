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
