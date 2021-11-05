import { Navbar, Button, ButtonGroup, Container, Nav } from "react-bootstrap";
import styles from "../styles/Nav.module.css";
import { Context } from "./stores";
import { useState, useEffect, useReducer, useContext } from "react";
import { useRouter } from "next/router";

const AppNavbar = () => {
  const { member, setMember, sportItem, setSportItem } = useContext(Context);
  const router = useRouter();
  //console.log(member);
  //console.log('Nav-----------');
  //console.log(sportItem);

  const handleButtonClick = (event, path) => {
    // console.log(event);
    // console.log(path);
    event.preventDefault();
    router.push(path);
  };

  return (
    <>
      <ButtonGroup className={styles.navbar}>
        <Button size="sm" id="login" variant="light" onClick={(e) => handleButtonClick(e, "/shooting")}>
          <span>
            Shooter<br></br>Shooters Information
          </span>
        </Button>
        <Button size="sm" variant="light" onClick={(e) => handleButtonClick(e, "/baseball")}>
          <span>
            Baseball <br></br>Baseball players Infomation
          </span>
        </Button>
        <Button size="sm" variant="light" onClick={(e) => handleButtonClick(e, "/athletics")}>
          <span>
            Athletics <br></br>Athletics players Infomation
          </span>
        </Button>
        <Button size="sm" variant="light" onClick={(e) => handleButtonClick(e, "/tennis")}>
          <span>
            Tennis <br></br>Tennis players Infomation
          </span>
        </Button>
        <Button size="sm" variant="light" onClick={(e) => handleButtonClick(e, "/shootingSheet")}>
          <span>
            Sheet<br></br>Shooters list
          </span>
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AppNavbar;
