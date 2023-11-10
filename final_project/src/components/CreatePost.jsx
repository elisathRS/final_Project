import { useState, Alert } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../client/supabaseClient";


const CreatePost = ({ userId }) => {
  const navigate = useNavigate();

  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState("");
  const [imageUrlPost, setImageUrlPost] = useState("");
  const [formErrorPost, setFormErrorPost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titlePost) {
      setFormErrorPost("Please enter a title (Name of your Pet).");
      return;
    }

    try {
      const { data, error } = await supabase.from("Posts").insert([
        {
          username: userId,
          title: titlePost,
          content: contentPost,
          image_url: imageUrlPost,
          comments: [],
        },
      ]);

      if (error) {
        console.log(error);
        setFormErrorPost("Please fill out all the fields.");
      } else {
        setFormErrorPost(null);
        navigate("/");
      }
    } catch (error) {
      setFormErrorPost("Error while creating the post");
    }
  };

  return (
    <div className="post_container">
      <form onSubmit={handleSubmit} className="form">
        <h2>New Post</h2>  
        <input  id="title" type="text" placeholder="Name of the Pet" value={titlePost} onChange={(e) => setTitlePost(e.target.value)} />
        <textarea id="content" type="text" placeholder="Describe your pet (Optional)" value={contentPost} onChange={(e) => setContentPost(e.target.value)} />
        <input  id="image-url"  placeholder="Image URL  (Optional)" value={imageUrlPost} onChange={(e) => setImageUrlPost(e.target.value)} />
        <button>Save Post</button>
        {formErrorPost && <p className="error">{formErrorPost}</p>}
      </form>
    </div>
  );
};

export default CreatePost;