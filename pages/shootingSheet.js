import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form,  Grid } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { AppWrapper ,useAppContext } from '../components/AppContext' ;
import Moment from 'react-moment';
import { Component } from 'react';

    
const ShootingSheet = ({ shooters }) => {
     
      const {member , setMember} = useAppContext() ;
      const [loading , setLoading ] = useState(false) ;
      const [shooter , setShooter ] = useState([]) ;
      const [name , setName] = useState([5]) ;
      const [birthday , setBirthday] = useState([]) ;
      const [gender , setGender] = useState([])  ;
      const [best10M60R , setBest10M60R] = useState([]) ;
      const [best50M3x20 , setBest50M3x20]   = useState([]) ;
      const [best50M3x40 , setBest50M3x40]   = useState([]) ;
      const [latestScore , setlatestScore]   = useState([]) ;
      const router = useRouter() ;
      
      let email = [] ;
      let shooterName =[] ;
      let shooterBirthday = [] ;  
      let shooterGender = [] ;
      let shooterBest10M60R = [] ;
      let shooterBest50M3x20 = [] ;
      let shooterBest50M3x40 = [] ;
      let shooterlatestScore = [] ;

      const callApi = () => {
       
        setLoading(true);
       
    }

      useEffect(() => {
       
        if (loading === false) {
            const id = setInterval(() => {
                callApi()
                
            }, 3000);
        }
       

        const getBaseballInfo = async () => {
            
            shooters.map(async (player) => {
             
                    try {
                          const url = process.env.HOST_URI + `api/baseballInfo/${player.email}` ;    
                           const res = await fetch(url, {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }) 
                        const record = await res.json();
                        
                        shooterName.push(record.data.ChineseName) ;
                        shooterGender.push(record.data.Gender) ;
                        email.push(player.email) ;
    
                    } catch (error) {
                        console.log(error);
                    }
                 
              
               
              }) ;
             
              setName(shooterName) ;
              setGender(shooterGender);
              setShooter(email) ;
            }
    
    
            const getContacts = async () => {
                shooters.map(async (player) => {
                    
                     //   console.log(player.sportItem);
                        try {
                              const url = process.env.HOST_URI + `api/contacts/${player.email}` ;    
                               const res = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }) 
                            const record = await res.json();
                            shooterBirthday.push(record.data.birthday) ;
                            
                        } catch (error) {
                            console.log(error);
                        }
                   
                  
                  }) ;
               //   console.log(shooterBirthday) ;
                  setBirthday(shooterBirthday)
            }
    
            const getPerformance = async () => {
                shooters.map(async (player) => {
                        try {
                              const url = process.env.HOST_URI + `api/shootingPerformance/${player.email}` ;    
                               const res = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }) 
                            const record = await res.json();
                         //  console.log(record.data.best10M60R) ;
                         //  console.log(record.data.best50M3x40) ;
                          // console.log(record.data.best50M3x20) ;
                         //  console.log(record.data.latestScore) ;
                            shooterBest10M60R.push(record.data.best10M60R) ;
                            shooterBest50M3x40.push(record.data.best50M3x40) ;
                            shooterBest50M3x20.push(record.data.best50M3x20) ;
                            shooterlatestScore.push(record.data.latestScore) ;
                        } catch (error) {
                            console.log(error);
                        }                    
                  }) ;
                  setBest10M60R(shooterBest10M60R) ;
                  setBest50M3x20(shooterBest50M3x20) ;
                  setBest50M3x40(shooterBest50M3x40) ;
                  setlatestScore(shooterlatestScore) ;
                 
          
            }
  
           getBaseballInfo() ;
           getContacts() ;
           getPerformance() ;
           
        },[])

        const handleButtonClick = (event) => {
            console.log(event.target.value) ;
           // console.log(email) ;
            setMember(shooter[event.target.value])   ;
            router.push(`/shootingPage?member=${member}`) ;
        }
     
       
      return (
      <div>
       <h1>Shooting Sheet Pages</h1>
       <div className="container-fluid" style={{width: '1024px'}}> 
       <div className="row">
    <div className="col-24">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" className="col-lg-1">Name</th>
            <th scope="col" className="col-lg-1">Gender</th>
            <th scope="col" className="col-lg-2">Birthday</th>
            <th scope="col" className="col-lg-2">10M Air Rifle Record(60 shots)</th>
            <th scope="col" className="col-lg-2">50M Rifle Record(3x40)</th>
            <th scope="col" className="col-lg-2">50M Rifle Record(3x20)</th>
            <th scope="col" className="col-lg-2">Latest Competition Results(10m)</th>
            <th scope="col" className="col-lg-1">Action</th>

          </tr>
        </thead>
        <tbody>
        
        {!loading ? <tr><td>Loading..........</td></tr>  : <>
         {name.map((player , index) => {
             return (
                <tr  key={index}>
                <td>{name[index]}</td>
                <td>{gender[index]}</td>
                <td> <Moment format="YYYY-MM-DD">{birthday[index]}</Moment></td>   
                <td>{best10M60R[index]}</td>
                <td>{best50M3x40[index]}</td>
                <td>{best50M3x20[index]}</td>
                <td>{latestScore[index]}</td>
                <td><button type="button" className="btn btn-primary" onClick={handleButtonClick} value={index} >Detial</button> </td>
                </tr>    
            )} ) }  
           </>  }
        </tbody>
      </table>
    </div>
    </div>
  </div>
   
       
       </div>     
            
      ) ;
}


ShootingSheet.getInitialProps = async () => {
    const url = process.env.HOST_URI + "api/members" ;
    const res = await fetch (url) ;
   // const res = await fetch('https://dashboard-chi-three.vercel.app/api/members');
    const { data } = await res.json(); 
    let adata = [] ;
    data.map((item)=>{
       if (item.sportItem === 'shooting'){
           adata.push(item) ;
       }         

    })
  
    return { shooters: adata}
  };
export default ShootingSheet ;