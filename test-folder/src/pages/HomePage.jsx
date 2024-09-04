import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    //Fetch data from API
    //fetchUsers();
    async function getUsers() {
      const data = localStorage.getItem("users"); // Get data from local storage.
      //const userData = JSON.parse(data) || []; // parse the data from string to js array.

      let userData = [];

      if (data) {
        userData = JSON.parse(data);
      } else {
        userData = await fetchUsers();
      }

      console.log(userData);

      setUsers(userData);
    }
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
    );
    const data = await response.json();
    localStorage.setItem("users", JSON.stringify(data));
    return data;
  }

  return (
    <div className="page">
      <section className="grid">
        {users.map((user) => (
          <User key={user} user={user} />
        ))}
      </section>
    </div>
  );
}
