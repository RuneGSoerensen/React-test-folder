import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("users");
    const userData = JSON.parse(data) || [];
    const user = userData.find((user) => user.id == id);
    setName(user.name);
    setTitle(user.title);
    setMail(user.mail);
    setImage(user.image);
  }, [id]);

  function handleCancel() {
    // cancel logic here
    navigate(-1);
  }

  function updateUser(event) {
    event.preventDefault();

    const userToUpdate = {
      name: name,
      title: title,
      mail: mail,
      image: image,
    };

    const data = localStorage.getItem("users");
    console.log(JSON.data);
    const userData = JSON.parse(data) || [];
    console.log(userData);
    // map through users
    const updatedUsers = userData.map((user) => {
      if (user.id === id) {
        return { ...user, ...userToUpdate };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate(`/users/${id}`);
  }

  return (
    <section>
      <div className="container">
        <h1>Update</h1>
        <form onSubmit={updateUser}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Type a name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Type a title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">Mail</label>
          <input
            type="text"
            id="mail"
            value={mail}
            placeholder="Type your mail"
            onChange={(e) => setMail(e.target.value)}
          />
          <label htmlFor="">Image URL</label>
          <input
            type="url"
            value={image}
            placeholder="Type a name"
            onChange={(e) => setImage(e.target.value)}
          />
          <img
            id="image-preview"
            className="image-preview"
            src={
              image
                ? image
                : "https://placehold.co/600x400?text=Paste+an+image+URL"
            }
            alt="Choose"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
          />
          <div className="btns">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button>Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}
