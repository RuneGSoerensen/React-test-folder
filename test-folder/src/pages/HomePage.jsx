import { useEffect, useState } from "react";
import User from "../components/User";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

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

  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const titles = [...new Set(users.map((user) => user.title))];

  if (filter != "") {
    filteredUsers = filteredUsers.filter((user) => user.title === filter);
  }

  filteredUsers.sort((user1, user2) =>
    user1[sortBy].localeCompare(user2[sortBy])
  );

  console.log(filteredUsers);

  return (
    <div className="page">
      <form className="grid-filter" role="search">
        <label>
          Search by Name{" "}
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">Select title</option>
            {titles.map((title) => (
              <option value={title} key={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select name="sort-by" onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">name</option>
            <option value="title">title</option>
            <option value="mail">mail</option>
          </select>
        </label>
      </form>
      <section className="grid">
        {filteredUsers.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </section>
    </div>
  );
}
