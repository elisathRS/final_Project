import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../client/supabaseClient";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import userIcon from "../assets/user_post.png";
import likeIcon from "../assets/like.png"

const Post = ({ userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [upvotes, setUpvotes] = useState("");
  const [comments, setComments] = useState("");
  const [author, setAuthor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [referencedPost, setReferencedPost] = useState("");

  // Referenced post data
  const [referencedAuthor, setReferencedAuthor] = useState("");
  const [referencedCreatedAt, setReferencedCreatedAt] = useState("");
  const [referencedTitle, setReferencedTitle] = useState("");
  const [referencedContent, setReferencedContent] = useState("");
  const [referencedImageUrl, setReferencedImageUrl] = useState("");
  const [referencedUpvotes, setReferencedUpvotes] = useState("");
  const [referencedRepost, setReferencedRepost] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("Posts").select().eq("id", id).single();

      if (error) {
        navigate("/", { replace: true });
      }

      // Current post
      if (data) {
        setAuthor(data.username);
        setCreatedAt(data.created_at);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
        setUpvotes(data.upvotes);
        setComments(data.comments);
        setReferencedPost(data.referenced_post);

        // Referenced post
        if (data.referenced_post) {
          const { data: referencedData, error } = await supabase.from("Posts").select().eq("id", data.referenced_post).single();

          if (error) {
            navigate("/", { replace: true });
          }

          if (referencedData) {
            setReferencedAuthor(referencedData.username);
            setReferencedCreatedAt(referencedData.created_at);
            setReferencedTitle(referencedData.title);
            setReferencedContent(referencedData.content);
            setReferencedImageUrl(referencedData.image_url);
            setReferencedUpvotes(referencedData.upvotes);
            setReferencedRepost(referencedData.referenced_post);
          }
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, navigate]);

  const formatDate = (postDate) => {
    let systemDate = new Date(Date.parse(postDate));
    let userDate = new Date();
    let dif = Math.floor((userDate - systemDate) / 1000);
    if (dif < 60) return "less than a minute ago";
    if (dif <= 60) return "one minute ago";
    if (dif <= 3540) return Math.round(dif / 60) + " minutes ago";
    if (dif <= 5400) return "1 hour ago";
    if (dif <= 86400) return Math.round(dif / 3600) + " hours ago";
    if (dif <= 129600) return "1 day ago";
    if (dif < 604800) return Math.round(dif / 86400) + " days ago";
    if (dif <= 777600) return "1 week ago";
    return "on " + systemDate;
  };

  const handleIncreaseUpvote = async () => {
    setUpvotes((upvotes) => upvotes + 1);
    const { data, error } = await supabase.from("Posts").update({ upvotes: upvotes + 1 }).eq("id", id);
    if (error) console.log("error: ", error);
  };

 
  const handleDelete = async () => {
    const { data, error } = await supabase.from("Posts").delete().eq("id", id);
    error ? console.log("error: ", error) : navigate("/");
  };

    return (
      <div className="page">
        <div className="post-card">
          <p>
            <img src={userIcon} alt="user" className="iconUser" />
            {author == userId ? "You" : author} - {formatDate(createdAt)}
          </p>
          <h3>{referencedPost ? "Re: " + title : title}</h3>
          <p>{content}</p>
          <center><img src={imageUrl}  className="imagePost" /></center>
          <hr />
          <div className="buttons">
            <div>
              <button className="upvote-button" onClick={() => handleIncreaseUpvote(id)}>
                <img src={likeIcon} alt="user" className="likeIcon" />
              </button>
              <span>{upvotes} votes</span>
            </div>
            <div>
              {author == userId && (
                <span>
                  <Link to={"/EditPost/" + id}>
                    <i className="material-icons">edit</i>
                  </Link>
                  <i className="material-icons" onClick={handleDelete}>
                    delete
                  </i>
                </span>
              )}
      
            </div>
          </div>
          <Comment userId={userId} comments={comments} setComments={setComments} postId={id} />
        </div>
        {referencedPost && (
          <div>
            <h3>Replying to...</h3>
            <div className="post-card">
              <p>
                Posted by {referencedAuthor == userId ? "You" : referencedAuthor} - {formatDate(referencedCreatedAt)}
              </p>
              <h3>
                <Link to={"/" + referencedPost}>{referencedRepost ? "Re: " + referencedTitle : referencedTitle}</Link>
              </h3>
              <p>{referencedContent}</p>
              <img src={referencedImageUrl} />
              <hr />
              <div>
                <span>{referencedUpvotes} upvotes</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  
};

export default Post;