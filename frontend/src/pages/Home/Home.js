import React from "react";
import Hero from "../../components/Hero/Hero";
import Team from "../../components/Team/Team";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <Team />
    </div>
  );
};

export default Home;
