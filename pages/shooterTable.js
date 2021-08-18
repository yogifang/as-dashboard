import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Form } from 'react-bootstrap';
import { useState ,useEffect } from 'react';
import { useRouter } from 'next/router'
import { AppWrapper ,useAppContext } from '../components/AppContext' ;


export async function getStaticProps({ preview = null, previewData = {} }) {
    const { ref } = previewData

  const client = Client()

  const doc = await client.getSingle("blog_home", ref ? { ref } : null) || {}

  const posts = await client.query(
    Prismic.Predicates.at("document.type", "post"), {
      orderings: "[my.post.date desc]",
      ...(ref ? { ref } : null)
    },
  )

  return {
    props: {
      shooters,
      test: shooters
      
    }
  }
}


const shooterTable = {
    member: '' ,
    name: '' ,
    gender: '' ,
    birthday: Date.now() ,
    best10M60R: 0 ,
    best50M3x40: 0 ,
    best50M3x40: 0 ,
    lastestScore: 0 ,
} ;

const urlBaseballInfo = process.env.HOST_URI + "api/baseballInfo" ;
const urlContacts = process.env.HOST_URI + "api/contacts" ;
const urlPerformance = process.env.HOST_URI + "api/shootingPerformance" ;

const ShooterTable = (props ) => {
  const router = useRouter() ;
  const {member , setMember} = useAppContext() ;
  const [name , setName] = useState([]) ;
  const [birthday , setBirthday] = useState([]) ;
  const [gender , setGender] = useState([])  ;
  const [best10M60R , setBest10M60R] = useState([]) ;
  const [best50M3x20 , setBest50M3x20]   = useState([]) ;
  const [best50M3x40 , setBest50M3x40]   = useState([]) ;
  const [lastestScore , setLastestScore]   = useState([]) ;
 
  let email = [] ;
  let shooterName =[] ;
  let shooterBirthday = [] ;  
  let shooterGender = [] ;
  let shooterBest10M60R = [] ;
  let shooterBest50M3x20 = [] ;
  let shooterBest50M3x40 = [] ;
  let shooterLastestScore = [] ;

  console.log(props) ;
 
  useEffect(() => {
         
  //  getBaseballInfo() ;
  //  getContacts() ;
 //   getPerformance() ;
 },[])


 


  const onMemberChange = (event) => {
   console.log(event.target.value);
   setMember(event.target.value) ;
   console.log(member);
    router.push(`/shootingPage?member=${member}`) ;
  };

  
  return (
    <div>
      <h1>射擊選手列表</h1>
      <div className="container-fluid" style={{width: '1024px'}}> 
       <div className={"row"}>
    <div className="col-24">
      <table className="table table-bordered">
        <thead>
          <tr>
           <th scope="col" className="col-lg-1">#</th>
            <th scope="col" className="col-lg-1">姓名</th>
            <th scope="col" className="col-lg-1">性別</th>
            <th scope="col" className="col-lg-2">生日</th>
            <th scope="col" className="col-lg-2">10米生涯最佳成績(60發)</th>
            <th scope="col" className="col-lg-2">50米生涯最佳成績(3x40)</th>
            <th scope="col" className="col-lg-2">50米生涯最佳成績(3x20)</th>
            <th scope="col" className="col-lg-2">最近一次比賽成績</th>
            <th scope="col" className="col-lg-1">Action</th>

          </tr>
        </thead>
        <tbody>
        
       
        </tbody>
      </table>
    </div>
    </div>
  </div>
    </div>
  );
};


export default ShooterTable;


