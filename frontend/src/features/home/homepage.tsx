
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../shared/components/header/Header';
import { FiSearch } from "react-icons/fi";
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
  const [category, setCategory] = useState<string>('');
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
        console.log(res)
      }
    ).finally(() => {
      setLoading(false);
    });

  }, [search]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(search);
    setCategory('');

    setLoading(true);
    getUserSearchApi(search).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
        console.log(res);
      }
    ).finally(() => {
      setLoading(false);
    });
  }

  function handleCategoryClick(event: React.MouseEvent<HTMLButtonElement>) {
    const selectedCategory = event.currentTarget.textContent || '';
    setCategory(selectedCategory);

    

    setLoading(true);
    getUserSearchApi(selectedCategory).then(
      (res: AxiosResponse<UserListResponse>) => {
        setUserList(res.data.users)
      }
    ).finally(() => {
      setLoading(false);
    });
  }

  const navigate = useNavigate();

  const catagories = [
             "All",
             "Developer", "Designer", "Marketer", 
            "Finance", "Legal", "Engineer"
          ]

  return (
    <>
      <Header />
      <div className = "wholeWrap">
      <form className="search-bar-wrapper" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-button" type="submit">
          <FiSearch className="search-icon" />
        </button>
      </form>
      

      <div className="category-buttons">
          {catagories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-button ${category === cat ? 'active' : ''}`}
              onClick={handleCategoryClick }
            >
              {cat}
            </button>
          ))}
        </div>



      <section className="profiles-section">
        <h2>Recently Uploaded Professionals</h2>
        <div className="profiles-grid" >
          {userList.map((user: User) => (
            <div key={user._id} onClick = { () => navigate(`/profile/${user._id}`) }>
              <p> {user.username}</p>
              <p> {user.email}</p>
            </div>
          ))}


        </div>
      </section>
      </div>
    </>
  )
}