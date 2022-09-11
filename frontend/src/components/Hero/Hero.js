import React from "react";
import styles from "./Hero.module.css";
import Man from "../../util/man-writing-book-on-deskook.png";
import Woman from "../../util/girl-reading-newspaper.png";
const Hero = () => {
  return (
    <div className={styles.hero}>
    <div className={styles.content}>
      <span>Remembering</span> Made Easy with
      <span style={{ color: "var(--text-secondary)" }}>
        Spaced-Repetition.
      </span>
    </div>
      <div className={styles.imgHolder}>
        <img src={Woman} alt="girl-reading-newspaper" />
      </div>
      <div className={styles.bottom}>
      <div className={styles.imgHolder}>
        <img src={Man} alt="man-writing-book-on-deskook" />
      </div>
        <div className={styles.content}>
          <span>Make flashcards and</span>Remember longer{" "}
          <span style={{ color: "var(--text-secondary)" }}>using our App.</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
