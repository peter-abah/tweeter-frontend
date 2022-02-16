import { baseUrl, defaultHeaders } from ".";
import { authHeader } from "./auth";
import { User } from "./users";
import stringifyParams, { Params } from "./stringifyParams";
import { UrlWithStringQuery } from "url";

export interface Tweet {
  tweet: {
    id: string;
    body: string;
    user: User;
    replies_count: number;
    retweets_count: number;
    likes_count: number;
    liked_by_user: boolean;
    retweeted_by_user: boolean;
    parent: Tweet | null;
    updated_at: string;
    created_at: string;
  };
  type: "tweet" | "like" | "retweet";
  id: string;
  user?: User;
  data_id: string;
}

export interface TweetAction {
  id: string;
  tweet: Tweet;
  user: User;
  type: "like" | "retweet";
}

export type FeedResult = Tweet | TweetAction;

export const getFeed = async (user: User | null, params: Params = {}) => {
  const stringParams = stringifyParams(params);
  const url = `${baseUrl}/feed/${stringParams}`;
  const headers = user ? authHeader(user) : defaultHeaders;

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const getTweetsForUser = async (
  currentUser: User | null,
  user: User,
  params: Params = {}
) => {
  params = { ...params, user_id: user.id };
  const stringParams = stringifyParams(params);
  const url = `${baseUrl}/tweets/${stringParams}`;
  const headers = currentUser ? authHeader(currentUser) : defaultHeaders;

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

interface createTweetBody {
  tweet: {
    body: string,
    parent_id?: string
  }
}
export const createTweet = async (currentUser: User, body: createTweetBody) => {
  const requestBody = JSON.stringify(body)
  const url = `${baseUrl}/tweets/`;

  const headers = authHeader(currentUser);
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: requestBody,
    headers
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const getTweet = async (
  currentUser: User | null,
  tweetId: string
) => {
  const url = `${baseUrl}/tweets/${tweetId}`;
  const headers = currentUser ? authHeader(currentUser) : defaultHeaders;

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const getTweetReplies = async (
  currentUser: User | null,
  tweetId: string,
  params: Params = {}
) => {
  const stringParams = stringifyParams(params);
  const url = `${baseUrl}/tweets/${tweetId}/replies/${stringParams}`;
  const headers = currentUser ? authHeader(currentUser) : defaultHeaders;

  const res = await fetch(url, {
    mode: "cors",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const retweetTweet = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/retweets`;
  const headers = authHeader(user);

  const res = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const deleteTweetRetweet = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/retweets`;
  const headers = authHeader(user);

  const res = await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers,
  });

  if (res.status === 204) {
    // no content
    return;
  }

  // response will have a body if there is an error
  throw await res.json();
};

export const likeTweet = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/likes`;
  const headers = user ? authHeader(user) : {};

  const res = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers,
  });

  const data = await res.json();
  if (data.error) throw data;

  return data;
};

export const deleteTweetLike = async (user: User, tweetId: string) => {
  const url = `${baseUrl}/tweets/${tweetId}/likes`;
  const headers = authHeader(user);

  const res = await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers,
  });

  if (res.status === 204) {
    // no content
    return;
  }

  // response will have a body if there is an error
  throw await res.json();
};
