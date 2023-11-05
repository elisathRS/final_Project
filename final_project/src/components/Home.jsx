import React, { useEffect, useState } from "react";
import supabase from "../client/supabaseClient";
import PostCard from "../components/PostCard";


const Home = ({ userId }) => {
  const [posts, setPosts] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("Posts").select().order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the posts");
        setPosts(null);
      } else {
        setPosts(data);
        setFetchError(null);
      }
    };

    fetchPosts();
  }, [orderBy]);

  const filteredPosts = searchTerm
    ? posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : posts;

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="order-by">
          <span>Order by:</span>
          <button className="orderbyButton" onClick={() => setOrderBy("created_at")}>Newest</button>
          <button className="orderbyButton" onClick={() => setOrderBy("upvotes")}>Most Popular</button>
        </div>
      </div>
      {filteredPosts && (
        <div className="post-grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} userId={post.username} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
