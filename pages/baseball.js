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
        <h1>Baseball Players</h1>
        <div className="container-fluid" style={{ width: "1024px" }}>
          <Form.Select
            aria-label="Default select example"
            onChange={onMemberChange}
            onClick={onMemberChange}
          >
            {baseballplayers.map((player) => {
              if (player.sportItem !== "baseball") return null;
              console.log(player.sportItem);
              return <option key={player._id}>{player.email}</option>;
            })}
          </Form.Select>
        </div>
      </div>
    </Container>
  );
};

Baseball.getInitialProps = async () => {
  const url = process.env.HOST_URI + "api/members";
  console.log(process.env.HOST_URI.toString());
  console.log(url);
  const res = await fetch(url);
  // const res = await fetch('https://dashboard-chi-three.vercel.app/api/members');
  const { data } = await res.json();
  return { baseballplayers: data };
};

export default Baseball;
