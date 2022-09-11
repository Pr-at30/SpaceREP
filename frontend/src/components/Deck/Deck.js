import React, { useEffect } from "react";
import styles from "./Deck.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeck } from "../../features/deck/deckSlice";

const Deck = ({ name, count, deckId }) => {
  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch]);


  const handelDelete = () => {
    dispatch(deleteDeck(deckId));
  };

  const handleAddCard = () => {
    localStorage.setItem('deckId', deckId)
  };


  return (
    <div className={styles.deck}>
      <h3 className={styles.heading} style={{ cursor: "pointer" }}>
        {name}
      </h3>
      <div className={styles.functions}>
        <Link to="/card-builder">
          <AiOutlinePlus
            onClick={handleAddCard}
            style={{ fontSize: "2rem", cursor: "pointer", color: "#333" }}
          />
        </Link>
        <div className={styles.countCard}>
          <p className={styles.count}>{count}</p>
          <p className={styles.text}>Cards</p>
        </div>
        <RiDeleteBin6Line
          onClick={handelDelete}
          style={{ fontSize: "2rem", cursor: "pointer" }}
        />
      </div>
      <div className={styles.btn}>
        <Link
          to="/qa"
          style={{
            textDecoration: "none",
            width: "80%",
          }}
        >
          <button className={styles.start}>Start</button>
        </Link>
      </div>
    </div>
  );
};

export default Deck;
