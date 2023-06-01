import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseURL } from './BaseURL';


export default function UserPage() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    axios.get(`${BaseURL}/register`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <div className="p-2">
      <h2 className='text-center'>All Users</h2>
      <div className='d-flex flex-wrap p-5'>

        {
          userData.map((user) => {
            return (
              <div className="card m-2" style={{width: "18rem"}}>
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                  <p className="card-text">{user.dob}</p>
                  <a href="/#" className="card-link">{user.contact}</a>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  );
}