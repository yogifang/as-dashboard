import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import { Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { Context } from "../components/stores";
import Moment from "react-moment";
import { Component } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Contant.module.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const columns = [
  { dataField: "PriPosition", text: "Position" },
  { dataField: "PassportName", text: "Name" },
  { dataField: "Birthday", text: "Birthday" },
  { dataField: "LeftRightHand", text: "B/T" },
  { dataField: "Throwing", text: "Throwing Velocity" },
  { dataField: "EXIT", text: "Exit Velocity" },
];

const BaseballSheet = ({ members, positions, names, birthdays, bts, throwings, exitings }) => {
  const players = names;
  const { member, setMember } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState([]);
  const router = useRouter();

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];
  // console.log(names);
  // console.log(genders);
  // console.log(birthdays);
  useEffect(() => {
    let tableData = [];

    for (let cnt = 0; cnt < names.length; cnt++) {
      const obj = Object.assign({ id: cnt }, positions[cnt], names[cnt], birthdays[cnt], bts[cnt], throwings[cnt], exitings[cnt]);
      tableData[cnt] = obj;
    }
    setDataset(tableData);
  }, []);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      //   console.log(`clicked on row with index: ${rowIndex}`);
      setMember(members[rowIndex].email);
      const email = members[rowIndex].email;
      router.push(`/baseballPage?member=${email}`);
    },
  };
  const handleButtonClick = (event) => {};
  function dateFormatter() {
    console.log("-------date formatter");
  }

  return (
    <Container className={styles.container}>
      <Navbar />
      <h2 className={styles.m0}>Baseball Sheet</h2>
      <div className={styles.contant}>
        <h4 className={styles.m0}>Click On Selected Row will show Details</h4>
        <div className={styles.sheettable}>
          <BootstrapTable striped bordered hover keyField="id" data={dataset} columns={columns} rowEvents={rowEvents} />
        </div>

        <Row className={styles.rowLine}>
          <div className="col-24"></div>
        </Row>
      </div>
    </Container>
  );
};

export default BaseballSheet;

export async function getServerSideProps() {
  const urlMembers = process.env.HOST_URI + "api/members";
  const urlBaseballInfo = process.env.HOST_URI + "api/baseballInfo";
  const urlContacts = process.env.HOST_URI + "api/contacts";
  const urlPerformance = process.env.HOST_URI + "api/baseballPerformance";
  const queryParams = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const [resMembers, resBaseballInfo, resContacts, resPerformances] = await Promise.all([
    fetch(urlMembers, queryParams),
    fetch(urlBaseballInfo, queryParams),
    fetch(urlContacts, queryParams),
    fetch(urlPerformance, queryParams),
  ]);

  const [dataMembers, dataBaseballInfo, dataContacts, dataPerformances] = await Promise.all([
    resMembers.json(),
    resBaseballInfo.json(),
    resContacts.json(),
    resPerformances.json(),
  ]);

  let adata = [];
  let dPositions = [];
  let dNames = [];
  let dBirthdays = [];
  let dBTs = [];
  let dThrowings = [];
  let dExitings = [];

  function findEmail(element, index, array) {
    return element.member === this;
  }

  dataMembers.data.map((item) => {
    if (item.sportItem === "baseball") {
      adata.push(item);
    }
  });

  adata.map((player, index) => {
    const baseballInfo = dataBaseballInfo.data.find(findEmail, player.email);
    if (baseballInfo !== undefined) {
      dNames[index] = { PassportName: baseballInfo.PassportName || " " };
      dBTs[index] = { LeftRightHand: baseballInfo.LeftRightHand || " " };
      dPositions[index] = { PriPosition: baseballInfo.PriPosition || " " };

      const dataContact = dataContacts.data.find(findEmail, player.email);
      let bdate;
      if (dataContact !== undefined) {
        bdate = dataContact.birthday;
      } else {
        bdate = new Date().toLocaleDateString();
      }
      bdate = bdate.substring(0, bdate.indexOf("T"));
      dBirthdays[index] = {
        Birthday: bdate,
      };
      const performance = dataPerformances.data.find(findEmail, player.email);
      if (performance !== undefined) {
        dThrowings[index] = { Throwing: performance.Throwing };
        dExitings[index] = { EXIT: performance.EXIT };
      } else {
        dThrowings[index] = { Throwing: "N/A" };
        dExitings[index] = { EXIT: "N/A" };
      }
    }
  });

  return {
    props: {
      members: adata,
      positions: dPositions,
      names: dNames,
      birthdays: dBirthdays,
      bts: dBTs,
      throwings: dThrowings,
      exitings: dExitings,
    },
  };
}
