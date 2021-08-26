import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form,  Grid , Row , Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { AppWrapper ,useAppContext } from '../components/AppContext' ;

import Moment from 'react-moment';

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
      const {member , setMember} = useAppContext() ;   
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
      <Container>
       <h1>Shooting Pages</h1>
       <div className="container-fluid" style={{width: '1024px'}}>
     

     <Row className="row marketing">
        <div className="col-lg-2" >
         <h5 style={{marginBottom:10}}>Personal information</h5>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>Chinese Naem</p>
         <h5 style={{marginBottom:10}}>{values.ChineseName}</h5>
         <p style={{marginBottom:0}}>Hight</p>
         <h5 style={{marginBottom:10}}>{values.Height}cm</h5>
         <p style={{marginBottom: 0}}>Citizenship</p>
         <h5 style={{marginBottom:10}}>{valContact.Nationality}</h5>     
         <p style={{marginBottom: 0}}>Current School</p>
         <h5 style={{marginBottom:10}}>{valContact.school}</h5>
       </div>

       <div className="col-lg-3">
         <p style={{marginBottom:0}}>Passport Name</p>
         <h5 style={{marginBottom:10}}>{values.PassportName}</h5>
         <p style={{marginBottom: 0}}>Weight</p>
         <h5 style={{marginBottom:10}}>{values.Weight}Kg</h5> 
         <p style={{marginBottom:0}}>Birthday</p>
         <h5 style={{marginBottom:10}}><Moment format="YYYY/MM/DD">
                {valContact.birthday}
            </Moment></h5>
         <p style={{marginBottom: 0}}>Residence</p>
         <h5 style={{marginBottom:10}}>{valContact.liveCity}</h5>
         
        
       </div>
       
       <div className="col-lg-3">
         <p style={{marginBottom:0}}>Gender</p>
         <h5 style={{marginBottom:10}}>{values.Gender}</h5>
         <p style={{marginBottom: 0}}>Grade</p>
         <h5 style={{marginBottom:10}}>{values.currentGrad}</h5>
         <p style={{marginBottom: 0}}>High school expected graduation date</p>
         <h5 style={{marginBottom:10}}><Moment format="YYYY-MM">
                {values.GradDate}
            </Moment></h5>
        
         <p style={{marginBottom:0}}>Other information</p>
         <h5 style={{marginBottom:10}}>{valContact.links}</h5>
         <p style={{marginBottom: 0}}>Email</p>
         <h5 style={{marginBottom:10}}>{valContact.email}</h5>
       </div>
     </Row>

     <Row className="row marketing">
        <Col className="col-lg-2">
         <h5 style={{marginBottom:10}}>Subject related</h5>
       </Col>
       <Col className="col-lg-3" >
         <p style={{marginBottom:0}}>School grades GPA</p>
         <h5 style={{marginBottom:10}}>{valSubjects.GPA}</h5>
         <p style={{marginBottom:0}}>Average grades</p>
         <h5 style={{marginBottom:10}}>{valSubjects.AVG}</h5>
         <p style={{marginBottom:0}}>TOFEL</p>
         <h5 style={{marginBottom:10}}>{valSubjects.TOFEL}</h5>   
       </Col>
       <Col className="col-lg-3" >
         <p style={{marginBottom:0}}>IELTS</p>
         <h5 style={{marginBottom:10}}>{valSubjects.IELTS}</h5>
         <p style={{marginBottom:0}}>TOEIC</p>
         <h5 style={{marginBottom:10}}>{valSubjects.TOEIC}</h5>
         <p style={{marginBottom:0}}>SAT</p>
         <h5 style={{marginBottom:10}}>{valSubjects.SAT}</h5>   
       </Col>
       <Col className="col-lg-3" >
         <p style={{marginBottom:0}}>ACT</p>
         <h5 style={{marginBottom:10}}>{valSubjects.ACT}</h5>
         <p style={{marginBottom:0}}>Interests in College Major</p>
         <h5 style={{marginBottom:10}}>{valSubjects.IntentMajor}</h5>     
       </Col>
     </Row>

     <Row className="row marketing">
        <Col className="col-lg-2">
         <h5 style={{marginBottom:10}}>Shooting performance</h5>
       </Col>
       <Col className="col-lg-3" >
         <p style={{marginBottom:0}}>Latest Competition Name</p>
         <h5 style={{marginBottom:10}}>{valPerformance.latestGameName}</h5>
         <p style={{marginBottom:0}}>10M Air Rifle Record(60 shots)</p>
         <h5 style={{marginBottom:10}}>{valPerformance.best10M60R}</h5>
         <p style={{marginBottom:0}}>50M Rifle Record (3x40)</p>
         <h5 style={{marginBottom:10}}>{valPerformance.best50M3x40}</h5>
         <p style={{marginBottom:0}}>50M Rifle Record (3x20)</p>
         <h5 style={{marginBottom:10}}>{valPerformance.best50M3x20}</h5>
         <p style={{marginBottom:0}}>National Rank</p>
         <h5 style={{marginBottom:10}}>{valPerformance.rankNational}</h5>
         <p style={{marginBottom:0}}>ISSF Profile Link</p>
         <h5 style={{marginBottom:10}}>{valPerformance.linkISSF}</h5>
       </Col>
       <Col className="col-lg-3" >
       <p style={{marginBottom:0}}>Latest Competition Name</p>
         <h5 style={{marginBottom:10}}>{valPerformance.latestScore}</h5>
         <p style={{marginBottom:0}}>Record Broken in What Level</p>
         <h5 style={{marginBottom:10}}>{valPerformance.best10MLevel}</h5>
         <p style={{marginBottom:0}}>Record Broken in What Level</p>
         <h5 style={{marginBottom:10}}>{valPerformance.best50M3x40Level}</h5>
         <p style={{marginBottom:0}}>Record Broken in What Level</p>
         <h5 style={{marginBottom:10}}>{valPerformance.best50M3x20Level}</h5>
         <p style={{marginBottom:0}}>World Rank</p>
         <h5 style={{marginBottom:10}}>{valPerformance.rankWorld}</h5>
         <p style={{marginBottom:0}}>Showcasing Vidoes</p>
         <h5 style={{marginBottom:10}}>{valPerformance.linkVideo}</h5>
       </Col>
       <Col className="col-lg-3" >
       <p style={{marginBottom:0}}>Date</p>
       <h5 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.latestGameDate}
            </Moment></h5>
            <p style={{marginBottom:0}}>Date</p>
       <h5 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.best10MDate}
            </Moment></h5>
            <p style={{marginBottom:0}}>Date</p>
       <h5 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.best50M3x40Date}
            </Moment></h5>
            <p style={{marginBottom:0}}>Date</p>
       <h5 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.best50M3x20Date}
            </Moment></h5>        
       </Col>
     </Row>

   </div> 
   
       
       </Container>     
            
      ) ;
}



export default ShootingPage ;