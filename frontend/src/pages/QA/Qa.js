import React from 'react'
import styles from "./Qa.module.css";
import Question from '../../components/Question/Question';
import Answer from '../../components/Answer/Answer';

function QA() {

  const [qa, setQa] = React.useState(true);

  return (
    <div className={styles.qa}>
      
      {qa ?
        <Question
        heading="Deck 1"
        question="Question 1"
        qdesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl."
        imgpath="https://picsum.photos/500/400"
        setQa={setQa}
        />
        :
        <Answer
        heading="Deck 1"
        solution="Solution 1"
        adesc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget aliquet nunc nisl eget nisl."
        imgpath="https://picsum.photos/500/400"
      />}

    </div>
  )
}

export default QA