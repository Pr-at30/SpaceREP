import React from 'react'
import styles from "./CardBuilder.module.css";
import { MDBInput, MDBTextArea, MDBFile } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { createCard } from '../../features/card/cardSlice';
import { useNavigate } from 'react-router-dom';

function CardBuilder() {

  const navigate = useNavigate();

  const [formValues, setFormValues] = React.useState({
    heading: '',
    desc: '',

    solutionText: '',
    solutionImage: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const uploadFile = (event) => {
    setFormValues({
      ...formValues,
      solutionImage: event.target.files[0],
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const deckid = localStorage.getItem("deckId");
    const formData = new FormData();
      formData.append('solutionImage', formValues.solutionImage, formValues.solutionImage.name);
      formData.append('heading', formValues.heading)
      formData.append('desc', formValues.desc)
    formData.append('solutionText', formValues.solutionText)
    dispatch(createCard(formData, deckid));
    setTimeout(() => {
      navigate('/study')
    }, 3000);
  };




  return (
    <>
      <div className={styles.card}>
        <span className={styles.deckHeading}>Deck heading</span>
        <div className={styles.builder}>

          <div className={styles.questionc}>
            <span className={styles.question}>Question Heading:</span>
            <MDBInput
              label='Text input'
              name="heading"
              id='typeText'
              type='text'
              size='lg'
              onChange={handleChange}
            />
          </div>

          <div className={styles.qdescc}>
            <span className={styles.qdesc}>Question Description:</span>
            <MDBTextArea
              label='Message'
              name="desc"
              id='textAreaExample'
              rows={6}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.builder}>

          <div className={styles.questionc}>
            <span className={styles.question}>Solution Heading:</span>
            <MDBInput
              label='Text input'
              name="solutionText"
              id='typeText'
              type='text'
              size='lg'
              onChange={handleChange}
            />
          </div>

          {/* <div className={styles.qdescc}>
            <span className={styles.qdesc}>Solution Description:</span>
            <MDBTextArea
              label='Message'
              name='adescription'
              id='textAreaExample'
              rows={6}
              value={formValues.adescription}
              onChange={handleChange}
            />
          </div> */}

          <div className={styles.qimagec}>
            <span className={styles.qimage}>Solution Image:</span>
            <MDBFile
              id='customFile'
              name='solutionImage'
              size='lg'
              onChange={uploadFile}
            />
          </div>
        </div>

        <button className={styles.done} onClick={handleSubmit}>
          Add Card
        </button>
      </div>
    </>
  )
}

export default CardBuilder