import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form,  Grid , Row , Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Context } from "../components/stores";

import Navbar from "../components/Navbar";
import styles from "../styles/Contant.module.css";
import OutputText from "../components/OutputText"; 
import OutputDate from "../components/OutputDate"
import OutputMonth from "../components/OutputMonth"
import OutputTextBig from "../components/OutputTextBig"
import OutputContent from "../components/OutputContent"

const initialBaseinfos = {
      ChineseName: '',
      PassportName: '',
      Gender: '',
      GradDate: Date.now(),
      Height: 0.0,
      LeftRightHand: '',
      PriPosition: '',
      SecPosition: '',
      Weight: 0.0,
      bFilled: false,
      currentGrad: '',
    };


    const initialContacts = {
      email: '',
      birthday: Date.now(),
      school: '',
      liveCity: '',
      Nationality: '',
      links: '',
      member: '',
      bFilled: false,
    };    

    const initialSubjects = {
      member: '',
      GPA: 0,
      AVG: 0,
      TOFEL: 0,
      IELTS: 0,
      TOEIC: 0,
      SAT: 0,
      ACT: 0,
      IntentMajor: '',
      bFilled: false,
    };

    const initialShootingPerformance = {
        member: '',
        latestGameName: '',
        latestScore: 0,
        latestGameDate: Date.now(),
        best10M60R: 0,
        best10MLevel: '',
        best10MDate: Date.now(),
        best50M3x40: 0,
        best50M3x40Level: '',
        best50M3x40Date: Date.now(),
        best50M3x20: 0,
        best50M3x20Level: '',
        best50M3x20Date: Date.now(),
        rankNational: 0,
        rankWorld: 0,
        linkISSF: '',
        linkVideo: '',
        bFilled: false,
      };
      
    
const ShootingPage = () => {
      const {member , setMember} = useContext(Context) ;   
      const [values , setValues] = useState(initialBaseinfos) ;
      const [valContact , setValContact] = useState(initialContacts) ;
      const [valSubjects , setValSubjects] = useState(initialSubjects) ;
      const [valPerformance , setValPerformance] = useState(initialShootingPerformance) ; 
     
      useEffect(() => {
        const getBaseballInfo = async () => {
            try {
                const url = process.env.HOST_URI + `api/baseballInfo/${member}` ;    
                // const res = await fetch(`https://dashboard-chi-three.vercel.app/api/baseballInfo/${member}`, {
                   const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const record = await res.json();
               // console.log(record.data);
                let field;
               let nValues = {};
              for (field in initialBaseinfos) {
                 nValues[field] = record.data[field];
                  }
                  setValues(nValues) ;      
            } catch (error) {
                console.log(error);
            }
        }


        const getContacts = async () => {
            try {
                const url = process.env.HOST_URI + `api/contacts/${member}` ;    
                //  const res = await fetch(`https://dashboard-chi-three.vercel.app/api/contacts/${member}`, {
                    const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const record = await res.json();
               // console.log(record.data);
                let field;
               let nValues = {};
              for (field in initialContacts) {
                 nValues[field] = record.data[field];
                  }
                  setValContact(nValues) ;
                
                 
            } catch (error) {
                console.log(error);
            }
        }

        const getSubjects = async () => {
            try {
                const url = process.env.HOST_URI + `api/subjects/${member}` ;    
                  const res = await fetch(url, {
               // const res = await fetch(`https://dashboard-chi-three.vercel.app/api/subjects/${member}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const record = await res.json();
               // console.log(record.data);
                let field;
               let nValues = {};
              for (field in initialSubjects) {
                 nValues[field] = record.data[field];
                  }
                  setValSubjects(nValues) ;    
            } catch (error) {
                console.log(error);
            }
        }

        const getPerformance = async () => {
            try {
                const url = process.env.HOST_URI + `api/shootingPerformance/${member}` ;    
                  const res = await fetch(url, {
             //   const res = await fetch(`https://dashboard-chi-three.vercel.app/api/shootingPerformance/${member}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const record = await res.json();
                console.log(record.data);
                let field;
               let nValues = {};
              for (field in initialShootingPerformance) {
               
                 nValues[field] = record.data[field];
                  }
                  setValPerformance(nValues) ;    
            } catch (error) {
                console.log(error);
            }
        }
            getBaseballInfo() ;
            getContacts() ;
            getSubjects() ;
            getPerformance() ;
        },[])

     

      return (
      <Container className={styles.container}>
        <Navbar />
        <h2 className={styles.m0}>Shooting Pages</h2>
        <div className={styles.contant}>
      
       <div className={styles.sheettable} style={{width: '1024px'}}>
     
       
       <Row className={styles.sheettable}>
        <Col className={styles.sidecolumn} sm='2' >
         <h5 className={styles.sidetitle}></h5>
       </Col>
       <Col sm="3" >
      
       <Image
      src="/human.png"
    
      alt="Picture of the author"
      width={500}
      height={500}
    />
       </Col>

       <Col sm="3" >
       <OutputTextBig cols="12" name="ChineseName" main="" value={values.ChineseName} />
       <OutputTextBig cols="12" name="PassportName" main="" value={values.PassportName} />
       <OutputText cols="12" name="Gender" main="" value={values.Gender} />
       <OutputContent cols="6" name="Hight" main="" value1 = {values.Height}  value2={values.Weight} unit1='cm' unit2='kg'/>   
       </Col>
       
       <Col sm="3" >
      
       </Col>
     </Row>
       
     <Row className={styles.sheettable}>
        <Col className={styles.sidecolumn} sm='2' >
         <h5 className={styles.sidetitle}>information<br/>Personal</h5>
       </Col>
       <Col sm="3" >
       <OutputDate cols="12" name="Birthday" main="Birthday" value={valContact.birthday} />
       <OutputText cols="12" name="Grade" main="Grade" value={values.currentGrad} />
       <OutputText cols="12" name="Citizenship" main="Citizenship" value = {valContact.Nationality}  />   
       <OutputText cols="12" name="Residence" main="Passport Name" value={valContact.liveCity} />

       </Col>

       <Col sm="3" >
       <OutputText cols="12" name="CurrentSchool" main="Current School" value = {valContact.school}  />  
       <OutputMonth cols="12" name="expectedgraduationdate" main="High school expected graduation date" value={valContact.birthday} /> 
       <OutputText cols="12" name="otherinformation" main="Other information" value={valContact.links} />
       </Col>
       
       <Col sm="3" >
       
       </Col>
     </Row>

     <Row className={styles.sheettable}>
        <Col className={styles.sidecolumn} sm='2'>
         <h5 className={styles.sidetitle}>related<br/>Subject</h5>
       </Col>
       <Col sm='3'>
       <OutputText cols="12" name="schoolgradesGPA" main="School grades GPA" value={valSubjects.GPA} />
       <OutputText cols="12" name="averagegrades" main="Average grades" value={valSubjects.AVG} />
       <OutputText cols="12" name="TOFEL" main="TOFEL" value={valSubjects.TOFEL} />
       
       </Col>
       <Col sm='3'>
       <OutputText cols="12" name="IELTS" main="IELTS" value={valSubjects.IELTS} />
       <OutputText cols="12" name="TOEIC" main="TOEIC" value={valSubjects.TOEIC} />
       <OutputText cols="12" name="SAT" main="SAT" value={valSubjects.SAT} />
         
       </Col>
       <Col sm='3'>
       <OutputText cols="12" name="ACT" main="ACT" value={valSubjects.ACT} />
       <OutputText cols="12" name="InterestsMajor" main="Interests in College Major" value={valSubjects.IntentMajor} />
      </Col>
     </Row>

     <Row className={styles.sheettable}>
        <Col className={styles.sidecolumn} sm='2'>
         <h5 className={styles.sidetitle}>performance<br/>Shooting</h5>
       </Col>
       <Col sm='3'>
      
       <OutputText cols="12" name="10M60r" main="10M Air Rifle Record(60 shots)" value={valPerformance.best10M60R} /> 
       <OutputText cols="12" name="50M3x40" main="50M Rifle Record (3x40)" value={valPerformance.best50M3x40} /> 
       <OutputText cols="12" name="50M3x20" main="50M Rifle Record (3x20)" value={valPerformance.best50M3x20} />
       <OutputText cols="12" name="LatestName" main="Latest Competition Name" value={valPerformance.latestGameName} />  
       <OutputText cols="12" name="NationalRank" main="National Rank" value={valPerformance.rankNational} />
       <OutputText cols="12" name="ISSFProfileLink" main="ISSF Profile Link" value={valPerformance.linkISSF} />
       <OutputText cols="12" name="ISSFProfileLink" main="Showcasing Vidoes" value={valPerformance.linkVideo} />


       </Col>
       <Col sm='3'>

       
       <OutputText cols="12" name="10M60r" main="Record Broken in What Level" value={valPerformance.best10MLevel} /> 
       <OutputText cols="12" name="50M3x40" main="Record Broken in What Level" value={valPerformance.best50M3x40Level} /> 
       <OutputText cols="12" name="50M3x20" main="Record Broken in What Level" value={valPerformance.best50M3x20Level} /> 
       <OutputText cols="12" name="latestScore" main="Latest Competition Score" value={valPerformance.latestScore} /> 
       <OutputText cols="12" name="NationalRank" main="World Rank" value={valPerformance.rankWorld} />
       
       </Col>
       <Col sm='3'>
       <OutputDate cols="12" name="Date10M" main="Date" value={valPerformance.best10MDate} />
       <OutputDate cols="12" name="Date50M3x40" main="Date" value={valPerformance.best50M3x40Date} />
       <OutputDate cols="12" name="Date50M3x20" main="Date" value={valPerformance.best50M3x20Date} />
       <OutputDate cols="12" name="Datelatest" main="Date" value={valPerformance.latestGameDate} />

       </Col>
     </Row>

   </div> 
   
       </div>
       </Container>     
            
      ) ;
}



export default ShootingPage ;