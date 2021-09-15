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
  { dataField: "PassportName", text: "Name" },
  { dataField: "Gender", text: "Gender" },
  { dataField: "Birthday", text: "Birthday" },
  { dataField: "best10M", text: "10M Air Rifle Record(60R)" },
  { dataField: "best50M3x40", text: "50M Rifle Record(3x40)" },
  { dataField: "best50M3x20", text: "50M Rifle Record(3x20)" },
  { dataField: "latestScore", text: "Latest Competition Results(10m)" },
];

const BaseballSheet = ({
  members,
  names,
  genders,
  birthdays,
  best10M60Rs,
  best50M3x40s,
  best50M3x20s,
  latestScores,
}) => {
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
      const obj = Object.assign(
        { id: cnt },
        names[cnt],
        genders[cnt],
        birthdays[cnt],
        best10M60Rs[cnt],
        best50M3x40s[cnt],
        best50M3x20s[cnt],
        latestScores[cnt]
      );
      tableData[cnt] = obj;
    }
    setDataset(tableData);
  }, []);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      //   console.log(`clicked on row with index: ${rowIndex}`);
      setMember(members[rowIndex].email);
      const email = members[rowIndex].email;
      router.push(`/shootingPage?member=${email}`);
    },
  };
  const handleButtonClick = (event) => { };
  function dateFormatter() {
    console.log("-------date formatter");
  }

  return (
    <Container className={styles.container}>
      <Navbar />
      <h2 className={styles.m0}>Shooters Sheet</h2>
      <div className={styles.contant}>
        <h4 className={styles.m0}>Click On Selected Row will show Details</h4>
        <div className={styles.sheettable}>
          <BootstrapTable
            striped
            bordered
            hover
            keyField="id"
            data={dataset}
            columns={columns}
            rowEvents={rowEvents}
          />
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
  const urlPerformance = process.env.HOST_URI + "api/shootingPerformance";
  const queryParams = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const [resMembers, resBaseballInfo, resContacts, resPerformances] =
    await Promise.all([
      fetch(urlMembers, queryParams),
      fetch(urlBaseballInfo, queryParams),
      fetch(urlContacts, queryParams),
      fetch(urlPerformance, queryParams),
    ]);

  const [dataMembers, dataBaseballInfo, dataContacts, dataPerformances] =
    await Promise.all([
      resMembers.json(),
      resBaseballInfo.json(),
      resContacts.json(),
      resPerformances.json(),
    ]);

  let adata = [];
  let dNames = [];
  let dGenders = [];
  let dBirthdays = [];
  let dBest10M60R = [];
  let dBest50M3x40 = [];
  let dBest50M3x20 = [];
  let dLatestScores = [];

  function findEmail(element, index, array) {
    return element.member === this;
  }

  dataMembers.data.map((item) => {
    if (item.sportItem === "shooting") {
      adata.push(item);
    }
  });

  adata.map((player, index) => {
    dNames[index] = {
      PassportName: dataBaseballInfo.data.find(findEmail, player.email)
        .PassportName,
    };
    dGenders[index] = {
      Gender: dataBaseballInfo.data.find(findEmail, player.email).Gender,
    };
    let bdate = dataContacts.data.find(findEmail, player.email).birthday;
    bdate = bdate.substring(0, bdate.indexOf("T"));
    dBirthdays[index] = {
      Birthday: bdate,
    };
    const performance = dataPerformances.data.find(findEmail, player.email);
    dBest10M60R[index] = { best10M: performance.best10M60R };
    dBest50M3x40[index] = { best50M3x40: performance.best50M3x40 };
    dBest50M3x20[index] = { best50M3x20: performance.best50M3x20 };
    dLatestScores[index] = { latestScore: performance.lastestScore };
  });

  return {
    props: {
      members: adata,
      names: dNames,
      genders: dGenders,
      birthdays: dBirthdays,
      best10M60Rs: dBest10M60R,
      best50M3x40s: dBest50M3x40,
      best50M3x20s: dBest50M3x20,
      latestScores: dLatestScores,
    },
  };
}
