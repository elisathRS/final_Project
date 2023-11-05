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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formError, setFormError] = useState(null);


  const handleAlert = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleAlertAndNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from("Posts").select().eq("id", id).single();
    
      if (error) {
        navigate("/", { replace: true });
      }else {
        console.log("data: ", data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
        
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setFormError("Please enter a title");
      return;
    }

    const { data, error } = await supabase
      .from("Posts")
      .update({ title, content, image_url: imageUrl })
      .eq("id", id);

    if (error) {
      setFormError("Please enter a title.");
    }
    else{
      setFormError(null);
      handleAlertAndNavigate();
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          id="content"
          type="text"
          placeholder="Content (Optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          id="image-url"
          placeholder="Image URL (Optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button>Update Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default EditPost;