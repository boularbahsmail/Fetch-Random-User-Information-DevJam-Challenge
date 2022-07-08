import React, { useState, useEffect } from "react";
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from "axios";

// React Icons
import { AiOutlineMail } from "react-icons/ai";
import { VscLocation } from "react-icons/vsc";
import { BsTelephone } from "react-icons/bs";

export default function Home() {

  const [user, SetUser] = useState("");
  const [load, SetLoad] = useState("Fetch New User");

  const fetchUser = () => {
    const api_url = 'https://randomuser.me/api/';
    SetLoad("Loading...");
    axios.get(api_url).then((response) => {
      const person = response.data;
      SetUser(person.results);
      SetLoad("Fetch New User");
    }).catch((error) => {
      alert("Failed to fetch user");
    });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        {user ? user.map((person, index) => 
          <title key={index}>
            {person.name.first +" "+ person.name.last}
          </title>
          ) 
        : "Random User"}
        <meta name="description" content="Fetching Random User Information And Render It As A User Card." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {
          user ?
            user.map((person, index) =>
              <div key={index} className={styles.Card} title={person.name.first + person.name.last}>
                <div className={styles.CardAvatar}>
                  <img src={person.picture.medium} alt="User-Avatar" height="80px" width="80px" />
                </div>
                <div>
                  <h2>{person.name.first} {person.name.last}</h2>
                  <p>@{person.login.username}</p>

                  <h5 title="Email">
                    <div className={styles.icon}>
                      <AiOutlineMail />
                    </div>
                    <span>{person.email}</span>
                  </h5>

                  <h5 title="Phone">
                    <div className={styles.icon}>
                      <BsTelephone />
                    </div>
                    <span>{person.phone}</span>
                  </h5>

                  <h5 title="Location">
                    <div className={styles.icon}>
                      <VscLocation />
                    </div>
                    <span>{person.location.city}, {person.location.country}</span>
                  </h5>
                </div>
              </div>
            )
            : null
        }
        <button onClick={fetchUser} title="Fetch New User">{load}</button>
        <h5>
          &copy; <b>DevJam Challenges</b> - 2022 - Made with ❤️ by {" "}
          <a href="https://twitter.com/boularbahsmail" target="_blank" rel="noreferrer">Ismailium</a>
        </h5>
      </main>
    </div>
  )
}
