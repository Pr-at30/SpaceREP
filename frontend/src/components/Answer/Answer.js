import React from "react";
import styles from "./Answer.module.css";
import { MDBBtn } from "mdb-react-ui-kit";

function Answer(props) {
  return (
    <div className={styles.card}>
      <span className={styles.deckHeading}>{props.heading}</span>
      <span className={styles.ques}>{props.solution}</span>
      <div className={styles.content}>
        <div className={styles.text}>{props.adesc}</div>
        <div className={styles.image}>
          <img src={props.imgpath} alt="Question pic" />
        </div>
      </div>
      <div className={styles.diff}>
        <button
          style={{ backgroundColor: "#d5471c" }}
          className={styles.diffBtn}
        >
          Again
        </button>
        <button
          style={{ backgroundColor: "#d95f3b" }}
          className={styles.diffBtn}
        >
          Hard
        </button>
        <button
          style={{ backgroundColor: "#c78b79" }}
          className={styles.diffBtn}
        >
          Good
        </button>
        <button style={{ backgroundColor: "#555" }} className={styles.diffBtn}>
          Easy
        </button>
      </div>
    </div>
  );
}

export default Answer;
