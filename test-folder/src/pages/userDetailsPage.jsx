import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "../components/User";

export default function UpdatePage() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("users");
    const userData = JSON.parse(data) || [];
    const user = userData.find((user) => user.id == id);
    console.log(user);
    setUser(user);
  }, [id]);

  function showDeleteDialog() {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${user.name}`
    );
    if (shouldDelete) {
      deleteUser();
    }
  }

  async function deleteUser() {
    const data = localStorage.getItem("users");
    const userData = JSON.parse(data) || [];
    const updatedUsers = userData.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/");
  }

  function showUpdate() {
    navigate(`/users/${id}/update`);
  }

  return (
    <div id="user-page" className="page">
      <div className="container">
        <h1>{user.name}</h1>
        <p>User Id: {id}</p>
        <User user={user} />
        <div className="btns">
          <button onClick={showDeleteDialog} className="btn-cancel">
            Delete user
          </button>
          <button onClick={showUpdate}>Update User</button>
        </div>
      </div>
    </div>
  );
}
