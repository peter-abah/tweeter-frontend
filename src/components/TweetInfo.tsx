import { Tweet } from "../api/tweets";

const TweetInfo = ({ type, tweet }: Tweet) => {
  const { user } = tweet;

  return type === "like" ? (
    <p className="text-xs mr-4">{user.name} Liked</p>
  ) : (
    <p className="text-xs ml-4">{user.name} Retweeted</p>
  );
};

export default TweetInfo;