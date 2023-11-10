import { Link } from "react-router-dom";
import userIcon from "../assets/user_post.png";

const PostCard = ({ post, userId }) => {
  const formatPostDate = (pdate) => {
    let userDate = new Date();

    let systemDate = new Date(Date.parse(pdate)); 
    let dif = Math.floor((userDate - systemDate) / 1000);

    if (dif < 60) return "less than a minute ago"; 
    if (dif <= 90)  return "one minute ago";   
    if (dif <= 3540) return Math.round(dif / 60) + " minutes ago";
    if (dif <= 5400) return "1 hour ago"; 
    if (dif <= 86400)  return Math.round(dif / 3600) + " hours ago"; 
    if (dif <= 129600) return "1 day ago";
    if (dif < 604800) return Math.round(dif / 86400) + " days ago";
  
    return "on " + systemDate;
  };

  return (
    <div className="post-card">
      <p>
        <img src={userIcon} alt="user" className="iconUser" />
        {post.id == userId ? "You" :post.username} - {formatPostDate(post.created_at)}
      </p>
      <h3>
        <Link to={"/" + post.id}>{post.referenced_post ? "Re: " + post.title : post.title}</Link>
      </h3>
      <p>{post.upvotes} upvotes</p>
    </div>
  );
};

export default PostCard;