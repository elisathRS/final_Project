import { useState, Alert } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../client/supabaseClient";

const CreatePost = ({ userId }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setFormError("Please ensure that your post has a title.");
      return;
    }

    const { data, error } = await supabase.from("Posts").insert([{ username: userId, title, content, image_url: imageUrl, comments: [] }]);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields.");
    }
    else {
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit} className="fo">
        <h2>New Post</h2>
      
        <input type="text" id="title" placeholder="Name of the Pet" value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea id="content" type="text" placeholder="Describe your pet (Optional)" value={content} onChange={(e) => setContent(e.target.value)} />

        <input type="text" id="image-url" placeholder="Image URL (Optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <button>Save Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;