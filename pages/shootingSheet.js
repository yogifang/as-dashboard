import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Grid, Table, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { Context } from "../components/stores";
import Moment from "react-moment";
import { Component } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Contant.module.css";

const ShootingSheet = ({ shooters }) => {
  const { member, setMember } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [shooter, setShooter] = useState([]);
  const [name, setName] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [gender, setGender] = useState([]);
  const [best10M60R, setBest10M60R] = useState([]);
  const [best50M3x20, setBest50M3x20] = useState([]);
  const [best50M3x40, setBest50M3x40] = useState([]);
  const [latestScore, setlatestScore] = useState([]);
  const router = useRouter();

  let email = [];
  let shooterName = [];
  let shooterBirthday = [];
  let shooterGender = [];
  let shooterBest10M60R = [];
  let shooterBest50M3x20 = [];
  let shooterBest50M3x40 = [];
  let shooterlatestScore = [];

  const callApi = () => {
    setLoading(true);
  };

  const getBaseballInfo = async () => {
    shooters.map(async (player, index) => {
      try {
        const url = process.env.HOST_URI + `api/baseballInfo/${player.email}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const record = await res.json();
        shooterName[index] = record.data.PassportName;
        email[index] = player.email;
        shooterGender[index] = record.data.Gender;
      } catch (error) {
        console.log(error);
      }
    });
    setName(shooterName);
    setGender(shooterGender);
    setShooter(email);
  };

  const getContacts = async () => {
    shooters.map(async (player, index) => {
      //   console.log(player.sportItem);
      try {
        const url = process.env.HOST_URI + `api/contacts/${player.email}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const record = await res.json();
        shooterBirthday[index] = record.data.birthday;
        //   shooterBirthday.push({data:record.data.birthday , email:player.email}) ;
      } catch (error) {
        console.log(error);
      }
    });
    //  console.log(shooterBirthday) ;
    setBirthday(shooterBirthday);
  };

  const getPerformance = async () => {
    shooters.map(async (player, index) => {
      try {
        const url =
          process.env.HOST_URI + `api/shootingPerformance/${player.email}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const record = await res.json();
        shooterBest10M60R[index] = record.data.best10M60R;
        shooterBest50M3x40[index] = record.data.best50M3x40;
        shooterBest50M3x20[index] = record.data.best50M3x20;
        shooterlatestScore[index] = record.data.latestScore;
        //   shooterBest10M60R.push({data:record.data.best10M60R, email:player.email}) ;
        //   shooterBest50M3x40.push({data:record.data.best50M3x40, email:player.email}) ;
        //  shooterBest50M3x20.push({data:record.data.best50M3x20 , email:player.email}) ;
        //  shooterlatestScore.push({data:record.data.latestScore , email:player.email}) ;
      } catch (error) {
        console.log(error);
      }
    });
    setBest10M60R(shooterBest10M60R);
    setBest50M3x20(shooterBest50M3x20);
    setBest50M3x40(shooterBest50M3x40);
    setlatestScore(shooterlatestScore);
  };

  useEffect(() => {
    if (loading === false) {
      const id = setInterval(() => {
        callApi();
      }, 3200);
    }
    getBaseballInfo();
    getContacts();
    getPerformance();
  }, []);

  const handleRowClick = (event) => {
    console.log(event.target.parentElement.rowIndex);

    const rowindex = event.target.parentElement.rowIndex - 1;
    if (event.target.parentElement.rowIndex === undefined) {
      return;
    }
    // console.log(event) ;
    // console.log(email) ;
    setMember(shooter[rowindex]);
    router.push(`/shootingPage?member=${member}`);
  };

  const handleButtonClick = (event) => {
    getBaseballInfo();
    getContacts();
    getPerformance();
  };

  return (
    <Container className={styles.container}>
      <Navbar />
      <div className={styles.contant}>
        <h1>Shooters Sheet</h1>
        <h4>Click On Selected Row will show Details</h4>
        <div className="container-fluid" style={{ width: "1024px" }}>
          <div className="row">
            <div className="col-24">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope="col" className="col-lg-3">
                      Name
                    </th>
                    <th scope="col" className="col-lg-1">
                      Gender
                    </th>
                    <th scope="col" className="col-lg-2">
                      Birthday
                    </th>
                    <th scope="col" className="col-lg-2">
                      10M Air Rifle Record(60 shots)
                    </th>
                    <th scope="col" className="col-lg-2">
                      50M Rifle Record(3x40)
                    </th>
                    <th scope="col" className="col-lg-2">
                      50M Rifle Record(3x20)
                    </th>
                    <th scope="col" className="col-lg-2">
                      Latest Competition Results(10m)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    <tr>
                      <td>Loading..........</td>
                    </tr>
                  ) : (
                    <>
                      {name.map((player, index) => {
                        return (
                          <tr
                            key={index}
                            onClick={handleRowClick}
                            value={player}
                          >
                            <td>{name[index]}</td>
                            <td>{gender[index]}</td>
                            <td>
                              {" "}
                              <Moment format="YYYY-MM-DD">
                                {birthday[index]}
                              </Moment>
                            </td>
                            <td>{best10M60R[index]}</td>
                            <td>{best50M3x40[index]}</td>
                            <td>{best50M3x20[index]}</td>
                            <td>{latestScore[index]}</td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

ShootingSheet.getInitialProps = async () => {
  const url = process.env.HOST_URI + "api/members";
  const res = await fetch(url);
  // const res = await fetch('https://dashboard-chi-three.vercel.app/api/members');
  const { data } = await res.json();
  let adata = [];
  data.map((item) => {
    if (item.sportItem === "shooting") {
      adata.push(item);
    }
  });

  return { shooters: adata };
};
export default ShootingSheet;
