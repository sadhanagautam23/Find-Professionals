
import { useEffect, useState } from 'react';
import { getUserListApi, getUserSearchApi } from '../../shared/config/api'

interface User {
  _id: string;
  username: string;
  email: string;

}

interface UserListResponse {
  users: User[];
}
import './homepage.css';
import type { AxiosResponse } from 'axios';




export default function Homepage() {
  /* const [user, setUser] = useState<User[]>([]); */
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
      }
    ).finally(() => {
      setLoading(false);
    });

  }, []);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(search);

    setLoading(true);
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
      }
    ).finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <header className="header">
        <div className="logo">ProFinder</div>
        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#professionals">Professionals</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <form className="search-bar-wrapper" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for professionals..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" type="submit">Search</button>
      </form>



      <section className="profiles-section">
        <h2>Recently Uploaded Professionals</h2>
        <div className="profiles-grid">
          {userList.map((user: User) => (
            <div key={user._id} >
              <p> {user.username}</p>
              <p> {user.email}</p>
            </div>
          ))}

        </div>
      </section>
    </>
  )
}