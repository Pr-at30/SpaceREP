import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./Question.module.css";
function Question(props) {
  const handleClick = () => {
    props.setQa(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.deckHeading}>
        <h5>{props.heading}</h5>
        <RiDeleteBin6Line style={{ fontSize: "2rem", cursor: "pointer" }} />
      </div>
      <span className={styles.ques}>{props.question}</span>
      <div className={styles.content}>
        <div className={styles.text}>{props.qdesc}</div>
        <div className={styles.image}>
          <img src={props.imgpath} alt="Question pic" />
        </div>
      </div>
      <button className={styles.showans} onClick={handleClick}>
        Show Answer
      </button>
    </div>
  );
}

export default Question;
