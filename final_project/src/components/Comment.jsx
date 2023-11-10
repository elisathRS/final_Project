import { useState } from "react";
import supabase from "../client/supabaseClient";

const Comment = ({ comments, setComments, userId, postId }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddNewComment = async (e) => {
    e.preventDefault();
  
    if (!newComment) return;
    
    try {
      const { data, error } = await supabase
        .from("Posts")
        .update({ comments: [...comments, { author: userId, text: newComment, createdAt: new Date() }] })
        .eq("id", postId);
  
      if (error) {
        console.error("Error adding comment:", error);
        return;
      }
  
      setComments((prevComments) => [...prevComments, { author: userId, text: newComment, createdAt: new Date() }]);
      setNewComment("");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const formatPostDate = (postDate) => {
    let userDate = new Date();
    let systemDate = new Date(Date.parse(postDate));
    let dif = Math.floor((userDate - systemDate) / 1000);

    if (dif < 60) return "less than a minute ago";
    if (dif <= 90) return "one minute ago";
    if (dif <= 3540) return Math.round(dif / 60) + " minutes ago";
    if (dif <= 5400) return "1 hour ago";
    if (dif <= 86400) return Math.round(dif / 3600) + " hours ago";
    if (dif <= 129600) return "1 day ago";
    if (dif < 604800) return Math.round(dif / 86400) + " days ago";
    return "on " + systemDate;
  };


  return (
    <div className="comments-seccion">
      {comments.length > 0 &&
        comments.map((comment) => (
          <p className="comment" key={comment.text}>
            {comment.author == userId ? "You" :comment.author}: {comment.text} - {formatPostDate(comment.createdAt)}
          </p>
        ))}
      <form onSubmit={handleAddNewComment}>
        <input className="comment-input" type="text" placeholder="Leave a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      </form>
    </div>
  );
};

export default Comment;