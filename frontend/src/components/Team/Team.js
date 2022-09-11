import React from "react";
import Member from "../../UI/Member/Member";
import styles from "./Team.module.css";

const Team = () => {
  return (
    <div className={styles.team}>
      <div className={styles.members}>
        <Member
          name="Swapnil Sahoo"
          imgPath="https://images.unsplash.com/photo-1532101585208-601806c8b6e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          social={{
            insta: "https://www.instagram.com/swapnil__kohan/",
            github: "https://github.com/swapnil0601",
            twitter: "https://twitter.com/kohan0601",
          }}
        />
        <Member
          name="Pratyush Jena"
          imgPath="https://images.unsplash.com/photo-1592769255412-dbce67b8c064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          social={{
            insta: "https://www.instagram.com/pratyushjena8/",
            github: "https://github.com/Pr-at30",
            twitter: "https://twitter.com/PJena10",
          }}
        />
        <Member
          name="Mayank Jhanwar"
          imgPath="https://images.unsplash.com/photo-1577487678721-20371623d7fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvZyUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          social={{
            insta: "https://www.instagram.com/swapnil__kohan/",
            github: "https://github.com/swapnil0601",
            twitter: "https://twitter.com/kohan0601",
          }}
        />
        <Member
          name="Punit Sisodia"
          imgPath="https://images.unsplash.com/photo-1571166581031-9d5db95d6df7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGRvZyUyMHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          social={{
            insta: "https://www.instagram.com/swapnil__kohan/",
            github: "https://github.com/swapnil0601",
            twitter: "https://twitter.com/kohan0601",
          }}
        />
      </div>
    </div>
  );
};

export default Team;
