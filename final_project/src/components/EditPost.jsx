import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../client/supabaseClient";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState(undefined);
  const [imageUrlPost, setImageUrlPost] = useState(undefined);
  const [formErrorPost, setFormErrorPost] = useState(undefined);


  const handleAlert = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleAlertAndNavigate = () => {
    navigate("/");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titlePost) {
      setFormErrorPost("Please enter a title for the post (Name of your Pet)");
      return;
    }

    const title = titlePost;
    const content = contentPost;
    const imageUrl = imageUrlPost;

    const { data, err } = await supabase.from("Posts").update({ title, content, image_url: imageUrl }).eq("id", id);
    err ? setFormErrorPost("Please enter a title.") : (setFormErrorPost(null), handleAlertAndNavigate());
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data, err } = await supabase.from("Posts").select().eq("id", id).single();
    
      if (err) {
        navigate("/", { replace: true });
      }else {
        setTitlePost(data.title);
        setContentPost(data.content);
        setImageUrlPost(data.image_url);        
      }
    };

    fetchPost();
  }, [id, navigate]);

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <input type="text" id="titlePost" placeholder="Title Post" value={titlePost} onChange={(e) => setTitlePost(e.target.value)}/>
        <textarea type="text" id="contentPost" placeholder="Content (Optional)" value={contentPost || ''} onChange={(e) => setContentPost(e.target.value)}/>
        <input type="text" id="image-url" placeholder="Image URL (Optional)" value={imageUrlPost|| ''} onChange={(e) => setImageUrlPost(e.target.value)}/>
        <button>Update Post</button>
        {formErrorPost && <p className="error">{formErrorPost}</p>}
      </form>
    </div>
  );
};

export default EditPost;