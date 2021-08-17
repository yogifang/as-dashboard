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

    const initialShootingPerformance = {
        member: '',
        latestGameName: '',
        lastestScore: 0,
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
      
    
const BaseballPage = () => {
      const {member , setMember} = useAppContext() ;   
      const [values , setValues] = useState(initialBaseinfos) ;
      const [valContact , setValContact] = useState(initialContacts) ;
      const [valSubjects , setValSubjects] = useState(initialSubjects) ;
      const [valPerformance , setValPerformance] = useState(initialShootingPerformance) ; 
     
      useEffect(() => {
            getBaseballInfo() ;
            getContacts() ;
            getSubjects() ;
            getPerformance() ;
        },[])

      const getBaseballInfo = async () => {
            try {
                const res = await fetch(`https://dashboard-chi-three.vercel.app/api/baseballInfo/${member}`, {
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
                const res = await fetch(`https://dashboard-chi-three.vercel.app/api/contacts/${member}`, {
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
                const res = await fetch(`https://dashboard-chi-three.vercel.app/api/subjects/${member}`, {
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
                const res = await fetch(`https://dashboard-chi-three.vercel.app/api/shootingPerformance/${member}`, {
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
                 console.log(field);
                 console.log(record.data[field]);

                 nValues[field] = record.data[field];
                  }
                  setValPerformance(nValues) ;    
            } catch (error) {
                console.log(error);
            }
        }

      return (
      <div>
       <h1>Shooting Pages</h1>
       <div className="container-fluid" style={{width: '1024px'}}>
     

     <div className="row marketing">
        <div className="col-lg-2" >
         <h4 style={{marginBottom:10}}>個資</h4>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>中文姓名</p>
         <h4 style={{marginBottom:10}}>{values.ChineseName}</h4>
         <p style={{marginBottom:0}}>身高</p>
         <h4 style={{marginBottom:10}}>{values.Height}cm</h4>
         <p style={{marginBottom: 0}}>國籍</p>
         <h4 style={{marginBottom:10}}>{valContact.Nationality}</h4>     
         <p style={{marginBottom: 0}}>就讀學校</p>
         <h4 style={{marginBottom:10}}>{valContact.school}</h4>
       </div>

       <div className="col-lg-3">
         <p style={{marginBottom:0}}>護照英文</p>
         <h4 style={{marginBottom:10}}>{values.PassportName}</h4>
         <p style={{marginBottom: 0}}>體重</p>
         <h4 style={{marginBottom:10}}>{values.Weight}Kg</h4> 
         <p style={{marginBottom:0}}>出生年月日</p>
         <h4 style={{marginBottom:10}}><Moment format="YYYY/MM/DD">
                {valContact.birthday}
            </Moment></h4>
         <p style={{marginBottom: 0}}>居住城市</p>
         <h4 style={{marginBottom:10}}>{valContact.liveCity}</h4>
         
        
       </div>
       
       <div className="col-lg-3">
         <p style={{marginBottom:0}}>性別</p>
         <h4 style={{marginBottom:10}}>{values.Gender}</h4>
         <p style={{marginBottom: 0}}>年級</p>
         <h4 style={{marginBottom:10}}>{values.currentGrad}</h4>
         <p style={{marginBottom: 0}}>高中預計畢業日期</p>
         <h4 style={{marginBottom:10}}><Moment format="YYYY-MM">
                {values.GradDate}
            </Moment></h4>
        
         <p style={{marginBottom:0}}>其他資料或個人社群連結</p>
         <h4 style={{marginBottom:10}}>{valContact.links}</h4>
         <p style={{marginBottom: 0}}>Email</p>
         <h4 style={{marginBottom:10}}>{valContact.email}</h4>
       </div>
     </div>

     <div className="row marketing">
        <div className="col-lg-2">
         <h4 style={{marginBottom:10}}>學科相關</h4>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>在校成績GPA</p>
         <h4 style={{marginBottom:10}}>{valSubjects.GPA}</h4>
         <p style={{marginBottom:0}}>在校平均成績</p>
         <h4 style={{marginBottom:10}}>{valSubjects.AVG}</h4>
         <p style={{marginBottom:0}}>托福考試成績</p>
         <h4 style={{marginBottom:10}}>{valSubjects.TOFEL}</h4>   
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>雅思考試成績</p>
         <h4 style={{marginBottom:10}}>{valSubjects.IELTS}</h4>
         <p style={{marginBottom:0}}>多益考試成績</p>
         <h4 style={{marginBottom:10}}>{valSubjects.TOEIC}</h4>
         <p style={{marginBottom:0}}>SAT考試成績</p>
         <h4 style={{marginBottom:10}}>{valSubjects.SAT}</h4>   
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>ACT考試成績</p>
         <h4 style={{marginBottom:10}}>{valSubjects.ACT}</h4>
         <p style={{marginBottom:0}}>欲就讀科系</p>
         <h4 style={{marginBottom:10}}>{valSubjects.IntentMajor}</h4>     
       </div>
     </div>

     <div className="row marketing">
        <div className="col-lg-2">
         <h4 style={{marginBottom:10}}>射擊運動成績</h4>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>最近一次比賽名稱</p>
         <h4 style={{marginBottom:10}}>{valPerformance.latestGameName}</h4>
         <p style={{marginBottom:0}}>10米生涯最佳成績（60發）</p>
         <h4 style={{marginBottom:10}}>{valPerformance.best10M60R}</h4>
         <p style={{marginBottom:0}}>50米生涯最佳成績(3x40)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.best50M3x40}</h4>
         <p style={{marginBottom:0}}>50米生涯最佳成績(3x20)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.best50M3x20}</h4>
         <p style={{marginBottom:0}}>國內排名</p>
         <h4 style={{marginBottom:10}}>{valPerformance.rankNational}</h4>
         <p style={{marginBottom:0}}>ISSF 官網選手連結</p>
         <h4 style={{marginBottom:10}}>{valPerformance.linkISSF}</h4>



       </div>
       <div className="col-lg-3" >
       <p style={{marginBottom:0}}>最近一次比賽成績</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lastestScore}</h4>
         <p style={{marginBottom:0}}>在哪一層級之賽事達到該成績</p>
         <h4 style={{marginBottom:10}}>{valPerformance.best10MLevel}</h4>
         <p style={{marginBottom:0}}>在哪一層級之賽事達到該成績</p>
         <h4 style={{marginBottom:10}}>{valPerformance.best50M3x40Level}</h4>
         <p style={{marginBottom:0}}>在哪一層級之賽事達到該成績</p>
         <h4 style={{marginBottom:10}}>{valPerformance.best50M3x20Level}</h4>
         <p style={{marginBottom:0}}>世界排名</p>
         <h4 style={{marginBottom:10}}>{valPerformance.rankWorld}</h4>
         <p style={{marginBottom:0}}>比賽或訓練影片</p>
         <h4 style={{marginBottom:10}}>{valPerformance.linkVideo}</h4>

       </div>
       <div className="col-lg-3" >
       <p style={{marginBottom:0}}>比賽日期</p>
       <h4 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.latestGameDate}
            </Moment></h4>
            <p style={{marginBottom:0}}>比賽日期</p>
       <h4 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.best10MDate}
            </Moment></h4>
            <p style={{marginBottom:0}}>比賽日期</p>
       <h4 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.best50M3x40Date}
            </Moment></h4>
            <p style={{marginBottom:0}}>比賽日期</p>
       <h4 style={{marginBottom:10}}><Moment format="YYYY-MM-DD">
                {valPerformance.best50M3x20Date}
            </Moment></h4>     
        
       </div>
     </div>

   </div> 
   
       
       </div>     
            
      ) ;
}



export default BaseballPage ;