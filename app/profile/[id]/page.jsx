"use client";

import { useEffect, useState } from "react";
//import { useQuery } from 'react-query';
//import { useSearchParams } from "react-query/core"; // Change import statement
import { useQuery, useSearchParams } from 'react-query';



import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = React.useMemo(() => {
    return React.Suspense(() => {
      return searchParams.get("name");
    });
  }, [searchParams]);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
