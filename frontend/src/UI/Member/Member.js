import React from "react";
import styles from "./Member.module.css";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
const Member = ({ name, imgPath, title, social }) => {
  const { insta, github, twitter } = social;
  return (
    <div className={styles.member}>
      <div className={styles.imgContainer}>
        <img
          src={
            imgPath ||
            "https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=682&q=80"
          }
          alt="profile"
          className={styles.profileImage}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.social}>
          <a href={github} target="__blank">
            <FaGithub className={styles.icon} />
          </a>
          <a href={insta} target="__blank">
            <FaInstagram className={styles.icon} />
          </a>
          <a href={twitter} target="__blank">
            <FaTwitter className={styles.icon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Member;
