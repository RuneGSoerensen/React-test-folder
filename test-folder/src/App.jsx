import { useState, useEffect } from "react";
import User from "./components/User";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const response = await fetch(
      "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
    );
    const data = await response.json();
    setUsers(data);
  }

  return (
    <main className="app">
      <h1>Welcome to REACT!!!</h1>

      <section className="grid">
        {users.map((user) => (
          <User
            key={user.id}
            name={user.name}
            mail={user.mail}
            image={user.image}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
