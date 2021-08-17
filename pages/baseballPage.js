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
            getBaseballInfo() ;
            getContacts() ;
            getSubjects() ;
            getPerformance() ;
        },[])

      const getBaseballInfo = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/baseballInfo/${member}`, {
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
                const res = await fetch(`http://localhost:3000/api/contacts/${member}`, {
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
                const res = await fetch(`http://localhost:3000/api/subjects/${member}`, {
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
                const res = await fetch(`http://localhost:3000/api/baseballPerformance/${member}`, {
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
       <h1>Baseball Pages</h1>
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
         <p style={{marginBottom:0}}>守備位置</p>
         <h4 style={{marginBottom:10}}>{values.PriPosition}</h4>
         <p style={{marginBottom:0}}>第二守備位置</p>
         <h4 style={{marginBottom:10}}>{values.SecPosition}</h4>
         <p style={{marginBottom: 0}}>投/打慣用手</p>
         <h4 style={{marginBottom:10}}>{values.LeftRightHand}</h4>     
       </div>

       <div className="col-lg-3">
         <p style={{marginBottom:0}}>護照英文</p>
         <h4 style={{marginBottom:10}}>{values.PassportName}</h4>
         <p style={{marginBottom: 0}}>體重</p>
         <h4 style={{marginBottom:10}}>{values.Weight}Kg</h4> 
         <p style={{marginBottom: 0}}>國籍</p>
         <h4 style={{marginBottom:10}}>{valContact.Nationality}</h4>
         <p style={{marginBottom: 0}}>居住城市</p>
         <h4 style={{marginBottom:10}}>{valContact.liveCity}</h4>
         <p style={{marginBottom: 0}}>就讀學校</p>
         <h4 style={{marginBottom:10}}>{valContact.school}</h4>
         <p style={{marginBottom: 0}}>Email</p>
         <h4 style={{marginBottom:10}}>{valContact.email}</h4>
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
         <p style={{marginBottom:0}}>出生年月日</p>
         <h4 style={{marginBottom:10}}><Moment format="YYYY/MM/DD">
                {valContact.birthday}
            </Moment></h4>
         <p style={{marginBottom:0}}>其他資料或個人社群連結</p>
         <h4 style={{marginBottom:10}}>{valContact.links}</h4>
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
         <h4 style={{marginBottom:10}}>運動表現成績</h4>
       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>10碼衝刺（秒</p>
         <h4 style={{marginBottom:10}}>{valPerformance.TenYardSplit}</h4>
         <h5 style={{marginBottom:10}}>投球表現與生涯數據</h5>
         <p style={{marginBottom:0}}>球速（英里每小時）</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Throwing}</h4>
         <p style={{marginBottom:0}}>捕手二壘阻殺測試(秒)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BlockPitch}</h4>   
         <p style={{marginBottom:0}}>防禦率</p>
         <h4 style={{marginBottom:10}}>{valPerformance.ERA}</h4>   
         <p style={{marginBottom:0}}>自責分</p>
         <h4 style={{marginBottom:10}}>{valPerformance.ER}</h4>   
         <p style={{marginBottom:0}}>出賽場數</p>
         <h4 style={{marginBottom:10}}>{valPerformance.gamesP}</h4>   
         <p style={{marginBottom:0}}>被全壘打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BHR}</h4>   
         <p style={{marginBottom:0}}>投球局數</p>
         <h4 style={{marginBottom:10}}>{valPerformance.IP}</h4>   
         <p style={{marginBottom:0}}>觸身球</p>
         <h4 style={{marginBottom:10}}>{valPerformance.HB}</h4>   
         <p style={{marginBottom:0}}>被安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BH}</h4>   
         <p style={{marginBottom:0}}>保送</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BB}</h4>   
         <p style={{marginBottom:0}}>被得分</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BRUN}</h4>   
         <p style={{marginBottom:0}}>三振</p>
         <h4 style={{marginBottom:10}}>{valPerformance.K}</h4>   


       </div>
       <div className="col-lg-3" >
         <p style={{marginBottom:0}}>60碼衝刺（秒</p>
         <h4 style={{marginBottom:10}}>{valPerformance.SixtyYardSplit}</h4>
         <h5 style={{marginBottom:10}}>打擊表現與生涯數據</h5>
         <p style={{marginBottom:0}}>揮棒速度(英里每小時)</p>
         <h4 style={{marginBottom:10}}>{valPerformance.EXIT}</h4>   
         <p style={{marginBottom:0}}>打席</p>
         <h4 style={{marginBottom:10}}>{valPerformance.AB}</h4>   
         <p style={{marginBottom:0}}>打擊率</p>
         <h4 style={{marginBottom:10}}>{valPerformance.AVG}</h4>   
         <p style={{marginBottom:0}}>二壘安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Hit2B}</h4>   
         <p style={{marginBottom:0}}>攻擊指數</p>
         <h4 style={{marginBottom:10}}>{valPerformance.OPS}</h4>   
         <p style={{marginBottom:0}}>三壘安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Hit3B}</h4>   
         <p style={{marginBottom:0}}>出賽場數</p>
         <h4 style={{marginBottom:10}}>{valPerformance.gamesH}</h4>   
         <p style={{marginBottom:0}}>全壘打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.HR}</h4>   
         <p style={{marginBottom:0}}>得分</p>
         <h4 style={{marginBottom:10}}>{valPerformance.RUN}</h4>   
         <p style={{marginBottom:0}}>被三振</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BK}</h4>   
         <p style={{marginBottom:0}}>安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.Hits}</h4>   
         <p style={{marginBottom:0}}>被保送</p>
         <h4 style={{marginBottom:10}}>{valPerformance.BB}</h4>   

       </div>
       <div className="col-lg-3" >
         
         <h5 style={{marginBottom:10}}>最近一場比賽成績</h5>
         <p style={{marginBottom:0}}>最近一次比賽名稱</p>
         <h4 style={{marginBottom:10}}>{valPerformance.latestGameName}</h4>  
         <p style={{marginBottom:0}}>最近一次比賽日期</p> 
         <h4 style={{marginBottom:10}}><Moment format="YYYY/MM/DD">
                {valPerformance.latestGameDate}
            </Moment></h4>
         <h5 style={{marginBottom:10}}>投球成績</h5>   
         <p style={{marginBottom:0}}>防禦率</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lERA}</h4> 
         <p style={{marginBottom:0}}>自責分</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lER}</h4>     
         <p style={{marginBottom:0}}>投球局數</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lIP}</h4>     
         <p style={{marginBottom:0}}>被全壘打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBHR}</h4>     
         <p style={{marginBottom:0}}>被安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBH}</h4>     
         <p style={{marginBottom:0}}>觸身球</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHB}</h4>     
         <p style={{marginBottom:0}}>被得分</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBRUN}</h4>     
         <p style={{marginBottom:0}}>保送</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBB}</h4>     
         <p style={{marginBottom:0}}>三振</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lK}</h4>  

         <h5 style={{marginBottom:10}}>打擊成績</h5>
         <p style={{marginBottom:0}}>打擊率</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lAVG}</h4> 
         <p style={{marginBottom:0}}>二壘安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHit2B}</h4>     
         <p style={{marginBottom:0}}>攻擊指數</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lOPS}</h4>     
         <p style={{marginBottom:0}}>三壘安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHit3B}</h4>     
         <p style={{marginBottom:0}}>得分</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lRUN}</h4>     
         <p style={{marginBottom:0}}>全壘打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHitHR}</h4>     
         <p style={{marginBottom:0}}>安打</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lHits}</h4>     
         <p style={{marginBottom:0}}>被三振</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBK}</h4>     
         <p style={{marginBottom:0}}>被保送</p>
         <h4 style={{marginBottom:10}}>{valPerformance.lBBB}</h4>          

       </div>
     </div>

   </div> 
   
       
       </div>     
            
      ) ;
}



export default BaseballPage ;