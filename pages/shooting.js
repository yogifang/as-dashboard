import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card, Form, Container } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../components/stores";
import Navbar from "../components/Navbar";
import styles from "../styles/Contant.module.css";
const Shooting = ({ shooters }) => {
  const router = useRouter();
  const { member, setMember } = useContext(Context);
  const onMemberChange = (event) => {
    console.log(event.target.value);
    setMember(event.target.value);
    console.log(member);
    router.push(`/shootingPage?member=${member}`);
  };
  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <h1>Shooters</h1>
        <div className="container-fluid" style={{ width: "1024px" }}>
          <Form.Select
            aria-label="Default select example"
            onChange={onMemberChange}
            onClick={onMemberChange}
          >
            {shooters.map((player) => {
              if (player.sportItem !== "shooting") return null;
              console.log(player.sportItem);
              return <option key={player._id}>{player.email}</option>;
            })}
          </Form.Select>
        </div>
      </div>
    </Container>
  );
};

Shooting.getInitialProps = async () => {
  const url = process.env.HOST_URI + "api/members";
  const res = await fetch(url);
  // const res = await fetch('https://dashboard-chi-three.vercel.app/api/members');
  const { data } = await res.json();
  return { shooters: data };
};

export default Shooting;
