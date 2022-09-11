import React, { useState, useEffect } from "react";
import Deck from "../../components/Deck/Deck";
import styles from "./Study.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBBtn,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { createDeck, getDecks, reset } from "../../features/deck/deckSlice";
import { useNavigate } from "react-router-dom";
import { profile } from "../../features/auth/authSlice";

const Study = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDecks = useSelector((state) => state.deck.deck.decks);
  console.log(userDecks);
  const [showModal, setShowModal] = useState(false);
  const [deckName, setDeckName] = useState("");

  const toggleShow = () => {
    setShowModal(!showModal);
  };

  const handleDeckName = (e) => {
    setDeckName(e.target.value);
    // dispatch(createDeck(deckName))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDeck({ name: deckName }));
    setTimeout(() => {
      dispatch(getDecks());
    }, 4000);
    setShowModal(false);
  };

  useEffect(() => {
    // dispatch(profile())
    dispatch(getDecks());
    

    return () => {
      dispatch(reset());
    };
  }, [ ]);

  return (
    <div className={styles.study}>
      <div className={styles.deckContainer}>
        {userDecks?.map((deck) => (
          <Deck
            key={deck._id}
            name={deck.name}
            count={deck.cards.length}
            deckId={deck._id}
          />
        ))}
        <div className={styles.card}>
          <BsFillPlusCircleFill
            style={{
              fontSize: "3rem",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
            onClick={toggleShow}
          />
        </div>
      </div>
      <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Give Deck Heading</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBValidation>
                <MDBValidationItem required feedback="Invalid Input">
                  <MDBInput
                    label="Deck Heading"
                    id="validationCustom01"
                    required
                    value={deckName}
                    onChange={handleDeckName}
                  />
                </MDBValidationItem>
              </MDBValidation>
            </MDBModalBody>

            <MDBBtn
              onClick={handleSubmit}
              style={{ backgroundColor: "var(--accent)" }}
            >
              Save changes
            </MDBBtn>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Study;
