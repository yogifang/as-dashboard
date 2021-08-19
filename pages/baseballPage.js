import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form,  Grid } from 'react-bootstrap';
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

    const initialBaseballPerformance = {
      member: '',
      TenYardSplit: 0,
      SixtyYardSplit: 0,
      Throwing: 0,
      BlockPitch: 0,
      ERA: 0,
      gamesP: 0,
      AVG: 0,
      ER: 0,
      EXIT: 0,
      HB: 0,
      HR: 0,
      IP: 0,
      K: 0,
      OPS: 0,
      gamesH: 0,
      BB: 0,
      BBB: 0,
      BH: 0,
      BHR: 0,
      BK: 0,
      BRUN: 0,
      RUN: 0,
      Hit2B: 0,
      Hit3B: 0,
      Hits: 0,
      lAVG: 0,
      lBB: 0,
      lBBB: 0,
      lBH: 0,
      lBHR: 0,
      lBK: 0,
      lBRUN: 0,
      lER: 0,
      lERA: 0,
      lHB: 0,
      lHit2B: 0,
      lHit3B: 0,
      lHitHR: 0,
      lHits: 0,
      lIP: 0,
      lK: 0,
      lOPS: 0,
      lRUN: 0,
      AB: 0,
      latestGameDate: Date.now(),
      latestGameName: '',
      bFilled: false,
    };
    
const BaseballPage = () => {
      const {member , setMember} = useAppContext() ;   
      const [values , setValues] = useState(initialBaseinfos) ;
      const [valContact , setValContact] = useState(initialContacts) ;
      const [valSubjects , setValSubjects] = useState(initialSubjects) ;
      const [valPerformance , setValPerformance] = useState(initialBaseballPerformance) ; 
     
   
     

      useEffect(() => {    
        const  getBaseballInfo = async () => {
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
                  const url = process.env.HOST_URI + `api/baseballPerformance/${member}` ; 
                  const res = await fetch(url, {
              //  const res = await fetch(`https://dashboard-chi-three.vercel.app/api/baseballPerformance/${member}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const record = await res.json();
               // console.log(record.data);
                let field;
               let nValues = {};
              for (field in initialBaseballPerformance) {
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
        },[]) ;

      return (
      <div>
       <h1>Baseball Pages</h1>
       <div className="container-fluid" style={{width: '1024px'}}>
     

     <div className="row marketing">
        <div className="col-lg-2" >
         <h4 style={{marginBottom:10}}>Personal information</h4>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>Name</p>
         <h4 style={{marginBottom:10}}>{values.ChineseName}</h4>
         <p style={{marginBottom:0}}>Hight</p>
         <h4 style={{marginBottom:10}}>{values.Height}cm</h4>
         <p style={{marginBottom:0}}>Defensive position</p>
         <h4 style={{marginBottom:10}}>{values.PriPosition}</h4>
         <p style={{marginBottom:0}}>Defensive position2</p>
         <h4 style={{marginBottom:10}}>{values.SecPosition}</h4>
         <p style={{marginBottom: 0}}>Throwing/playing hand</p>
         <h4 style={{marginBottom:10}}>{values.LeftRightHand}</h4>     
       </div>

       <div className="col-lg-3">
         <p style={{marginBottom:0}}>Passport Name</p>
         <h4 style={{marginBottom:10}}>{values.PassportName}</h4>
         <p style={{marginBottom: 0}}>Weight</p>
         <h4 style={{marginBottom:10}}>{values.Weight}Kg</h4> 
         <p style={{marginBottom: 0}}>Citizenship</p>
         <h4 style={{marginBottom:10}}>{valContact.Nationality}</h4>
         <p style={{marginBottom: 0}}>Residence</p>
         <h4 style={{marginBottom:10}}>{valContact.liveCity}</h4>
         <p style={{marginBottom: 0}}>Current school</p>
         <h4 style={{marginBottom:10}}>{valContact.school}</h4>
         <p style={{marginBottom: 0}}>Email</p>
         <h4 style={{marginBottom:10}}>{valContact.email}</h4>
       </div>
       
       <div className="col-lg-3">
         <p style={{marginBottom:0}}>Gender</p>
         <h4 style={{marginBottom:10}}>{values.Gender}</h4>
         <p style={{marginBottom: 0}}>Grade</p>
         <h4 style={{marginBottom:10}}>{values.currentGrad}</h4>
         <p style={{marginBottom: 0}}>High school expected graduation date</p>
         <h4 style={{marginBottom:10}}><Moment format="YYYY-MM">
                {values.GradDate}
            </Moment></h4>
         <p style={{marginBottom:0}}>Birthday</p>
         <h4 style={{marginBottom:10}}><Moment format="YYYY/MM/DD">
                {valContact.birthday}
            </Moment></h4>
         <p style={{marginBottom:0}}>Other information</p>
         <h4 style={{marginBottom:10}}>{valContact.links}</h4>
       </div>
     </div>

     <div className="row marketing">
        <div className="col-lg-2">
         <h4 style={{marginBottom:10}}>Subject related</h4>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>School grades GPA</p>
         <h4 style={{marginBottom:10}}>{valSubjects.GPA}</h4>
         <p style={{marginBottom:0}}>Average grades</p>
         <h4 style={{marginBottom:10}}>{valSubjects.AVG}</h4>
         <p style={{marginBottom:0}}>TOFEL</p>
         <h4 style={{marginBottom:10}}>{valSubjects.TOFEL}</h4>   
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>IELTS</p>
         <h4 style={{marginBottom:10}}>{valSubjects.IELTS}</h4>
         <p style={{marginBottom:0}}>TOEIC</p>
         <h4 style={{marginBottom:10}}>{valSubjects.TOEIC}</h4>
         <p style={{marginBottom:0}}>SAT</p>
         <h4 style={{marginBottom:10}}>{valSubjects.SAT}</h4>   
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>ACT</p>
         <h4 style={{marginBottom:10}}>{valSubjects.ACT}</h4>
         <p style={{marginBottom:0}}>Interests in College Major</p>
         <h4 style={{marginBottom:10}}>{valSubjects.IntentMajor}</h4>     
       </div>
     </div>

     <div className="row marketing">
        <div className="col-lg-2">
         <h4 style={{marginBottom:10}}>Athletic performance</h4>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>10 yard sprint(s)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.TenYardSplit}</h4>
         <p style={{marginBottom:0}}>60 Yard Sprint(s)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.SixtyYardSplit}</h4>
         
         <p style={{marginBottom:0}}>Most recent game tournament/competition name</p>
         <h4 style={{marginBottom:10}}>{valPerformance.latestGameName}</h4>  
         <p style={{marginBottom:0}}>Most recent game date</p> 
         <h4 style={{marginBottom:10}}><Moment format="YYYY/MM/DD">
                {valPerformance.latestGameDate}
            </Moment></h4>
         <h5 style={{marginBottom:10}}>Pitching Performance</h5>
         <p style={{marginBottom:0}}>Throwing Velocity (mph)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Throwing}</h4>
         <p style={{marginBottom:0}}>Block Pitch(s)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BlockPitch}</h4>   
         <p style={{marginBottom:0}}>ERA</p>
         <h4 style={{marginBottom:10}}>{valPerformance.ERA}</h4>   
         <p style={{marginBottom:0}}>ER</p>
         <h4 style={{marginBottom:10}}>{valPerformance.ER}</h4>   
         <p style={{marginBottom:0}}>Games</p>
         <h4 style={{marginBottom:10}}>{valPerformance.gamesP}</h4>   
         <p style={{marginBottom:0}}>BHR</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BHR}</h4>   
         <p style={{marginBottom:0}}>IP</p>
         <h4 style={{marginBottom:10}}>{valPerformance.IP}</h4>   
         <p style={{marginBottom:0}}>HB</p>
         <h4 style={{marginBottom:10}}>{valPerformance.HB}</h4>   
         <p style={{marginBottom:0}}>H</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BH}</h4>   
         <p style={{marginBottom:0}}>BB</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BB}</h4>   
         <p style={{marginBottom:0}}>R</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BRUN}</h4>   
         <p style={{marginBottom:0}}>K</p>
         <h4 style={{marginBottom:10}}>{valPerformance.K}</h4>   


       </div>
       <div className="col-lg-3" >
        
         <h5 style={{marginBottom:10}}>Hit performance </h5>
         <p style={{marginBottom:0}}>Exit Velocity(mph)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.EXIT}</h4>   
         <p style={{marginBottom:0}}>AB</p>
         <h4 style={{marginBottom:10}}>{valPerformance.AB}</h4>   
         <p style={{marginBottom:0}}>AVG</p>
         <h4 style={{marginBottom:10}}>{valPerformance.AVG}</h4>   
         <p style={{marginBottom:0}}>2B</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Hit2B}</h4>   
         <p style={{marginBottom:0}}>OPS</p>
         <h4 style={{marginBottom:10}}>{valPerformance.OPS}</h4>   
         <p style={{marginBottom:0}}>3B</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Hit3B}</h4>   
         <p style={{marginBottom:0}}>Games</p>
         <h4 style={{marginBottom:10}}>{valPerformance.gamesH}</h4>   
         <p style={{marginBottom:0}}>HR</p>
         <h4 style={{marginBottom:10}}>{valPerformance.HR}</h4>   
         <p style={{marginBottom:0}}>R</p>
         <h4 style={{marginBottom:10}}>{valPerformance.RUN}</h4>   
         <p style={{marginBottom:0}}>K</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BK}</h4>   
         <p style={{marginBottom:0}}>H</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Hits}</h4>   
         <p style={{marginBottom:0}}>BB</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BB}</h4>   

       </div>
       <div className="col-lg-3" >
       <h5 style={{marginBottom:10}}>Most recent game statistics</h5>
         <h5 style={{marginBottom:10}}>Pitching Performance</h5>   
         <p style={{marginBottom:0}}>ERA</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lERA}</h4> 
         <p style={{marginBottom:0}}>ER</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lER}</h4>     
         <p style={{marginBottom:0}}>IP</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lIP}</h4>     
         <p style={{marginBottom:0}}>HR</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBHR}</h4>     
         <p style={{marginBottom:0}}>H</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBH}</h4>     
         <p style={{marginBottom:0}}>HB</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHB}</h4>     
         <p style={{marginBottom:0}}>R</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBRUN}</h4>     
         <p style={{marginBottom:0}}>BB</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBB}</h4>     
         <p style={{marginBottom:0}}>K</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lK}</h4>  

         <h5 style={{marginBottom:10}}>Hitting Performance</h5>
         <p style={{marginBottom:0}}>AVG</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lAVG}</h4> 
         <p style={{marginBottom:0}}>2B</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHit2B}</h4>     
         <p style={{marginBottom:0}}>OPS</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lOPS}</h4>     
         <p style={{marginBottom:0}}>3B</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHit3B}</h4>     
         <p style={{marginBottom:0}}>R</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lRUN}</h4>     
         <p style={{marginBottom:0}}>HR</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHitHR}</h4>     
         <p style={{marginBottom:0}}>H</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHits}</h4>     
         <p style={{marginBottom:0}}>K</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBK}</h4>     
         <p style={{marginBottom:0}}>BB</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBBB}</h4>          

       </div>
     </div>

   </div> 
   
       
       </div>     
            
      ) ;
}



export default BaseballPage ;