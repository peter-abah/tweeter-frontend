import { useInfiniteQuery } from "react-query";
import { User, getFollowers } from "../api/users";
import { useAuth } from "../contexts/authContext";
import { useFollowUser } from "../hooks";
import Users from "./Users";

const Followers = ({ user }: { user: User }) => {
  const { currentUser } = useAuth();
  const queryKey = ["users", "followers", user, currentUser];

  const usersValues = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => getFollowers(currentUser, user, { page: pageParam }),
    { getNextPageParam: (lastPage) => lastPage.current_page + 1 }
  );

  const { follow, unfollow } = useFollowUser(queryKey);

  return (
    <Users usersValues={usersValues} onFollow={follow} onUnfollow={unfollow} />
  );
};

export default Followers;
