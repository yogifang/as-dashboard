import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Container, Button, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../components/stores";
import Navbar from "../components/Navbar";
import styles from "../styles/Contant.module.css";
const Baseball = ({ baseballplayers }) => {
  const router = useRouter();

  const { member, setMember } = useContext(Context);
  const onMemberChange = (event) => {
    console.log(event.target.value);
    setMember(event.target.value);
    console.log(member);
    router.push(`/baseballPage?member=${member}`);
  };
  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <h2 className={styles.m0}>Baseball Players</h2>

        <Form.Select aria-label="Select a Player" value="" onChange={onMemberChange} className={styles.centerSelect} placeholder="Search player">
          <option key="blankChoice" hidden value>
            Search player.....
          </option>
          {baseballplayers.map((player) => {
            if (player.sportItem !== "baseball") return null;
            //    console.log(player.sportItem);
            return <option key={player._id}>{player.email}</option>;
          })}
        </Form.Select>
      </div>
    </Container>
  );
};

Baseball.getInitialProps = async () => {
  const url = process.env.HOST_URI + "api/members";
  const res = await fetch(url);
  const { data } = await res.json();
  return { baseballplayers: data };
};

export default Baseball;
