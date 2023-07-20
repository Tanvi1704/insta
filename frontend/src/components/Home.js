import React,{useEffect,useState} from 'react'
import "../css/Home.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"

export default function Home() {
  var picLink ="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const navigate= useNavigate();
  const [data,setData] = useState([]);
  const [comment,setComment] =useState("");
  const [show,setShow] =useState(false);
  const [item,setItem] =useState([]);

     //toast functions
const notifyA = (msg) => toast.error(msg)
const notifyB = (msg) => toast.success(msg)

  useEffect(() =>{
    const token = localStorage.getItem("jwt");
    if(!token){
      navigate("./signup")
    }
    // fetch
    fetch("http://localhost:5000/allposts",{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res =>res.json())
      .then(result =>{
        console.log(result)
        setData(result)})
      .catch(err => console.log(err))
  } ,[])

  //to show and hide comments
  const toggleComment= (posts) =>{
    if(show){
      setShow(false);
    }else{
      setShow(true);
      setItem(posts);
    }
  }

  const likePost =(id) =>{
    fetch("http://localhost:5000/like",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res =>res.json())
    .then((result) => {
      const newData = data.map((posts) =>{
        if(posts._id == result._id){
          return result;
        }else{
          return posts;
        }
      });
      setData(newData);
      console.log(result);
    })
  }

  const unlikePost =(id) =>{
    fetch("http://localhost:5000/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res =>res.json())
    .then((result) => {
      const newData = data.map((posts) =>{
        if(posts._id == result._id){
          return result;
        }else{
          return posts;
        }
      });
      setData(newData);
      console.log(result)
    })
  }

  //function to make comment
  const makeComment= (text,id) =>{
    fetch("http://localhost:5000/comment",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        text:text,
        postId:id
      })
    }).then(res =>res.json())
    .then((result) => {
      const newData = data.map((posts) =>{
        if(posts._id == result._id){
          return result;
        }else{
          return posts;
        }
      });
      setData(newData);
      setComment("");
      notifyB("comment posted");
      console.log(result);
    })
  }


  return (
    <div className="home">
      {data.map((posts)=>{
        return( 
          <div className='card'>
      <div className='card-header'>
        <div className='card-pic'>
          <img src={posts.postedBy.Photo? posts.postedBy.Photo:picLink} alt=""/>
        </div>
        {/* <h3>Mr Beast</h3> */}
        <h3>
          <Link to={` /profile/${posts.postedBy._id}`}>
             {posts.postedBy.name} 
          </Link>
         </h3>
      </div>
      <div className='card-image'>
        <img src={posts.photo}  alt="" />
      </div>
      <div className='card-content'>
        {
          posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
          (<span class="material-symbols-outlined material-symbols-outlined-red"  onClick={() =>{unlikePost(posts._id)}}>favorite</span>)
          :<span class="material-symbols-outlined"  onClick={() =>{likePost(posts._id)}}>favorite</span>
        }
            
      <p>{posts.likes.length} likes</p>
      <p>{posts.body}</p>
      <p style={{fontWeight:"bold",cursor:"pointer"}} onClick={() =>{
        toggleComment(posts);
        }}>View all Comments</p>
      </div>
      <div className="add-comment">
      <span class="material-symbols-outlined"> mood</span>
      <input type="text" placeholder="Add a comment" value={comment} onChange={(e) =>{setComment(e.target.value)}} />
      <button className='comment' style={{fontSize:20}} onClick={() =>{makeComment(comment,posts._id)}} >Post</button>
      </div>
  </div>  
        )
      })}   
       {/* show comment */}
       {show && ( 
      <div className="showComment">
        <div className="container">
          <div className="postPic">
          <img src={item.photo} alt="" />
           
            <div className="details">
            <div className='card-header' style={{borderBottom: "1px solid #00000029"}}>
                 <div className='card-pic'>
                     {/* <img src="https://images.unsplash.com/photo-1546019170-f1f6e46039f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGh1bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"alt=" "/> */}
                       <img src="" alt=""></img>
                  </div>
        
                 <h3>{item.postedBy.name}</h3>
              </div>
            </div>
            {/* comment-section */}
                  <div className="comment-section" style={{borderBottom: "1px solid #00000029"}}>
                     {item.comments.map((comment) =>{
                    return(<p className='comm'>                      
                    <span className='commenter' style={{fontWeight:"bolder"}}>{comment.postedBy.name}{" "}</span>
                    <span className='commentText'>{comment.comment}</span>
                    </p>)
                      })}
                      </div>
                    {/* card-content */}
                      <div className='card-content'>
                           <p>{item.likes.length}</p>
                           <p>{item.body}</p>
                      </div>
                      <div className="add-comment">
                          <span class="material-symbols-outlined"> mood</span>
                          <input type="text" placeholder="Add a comment" value={comment} 
                          onChange={(e) =>{setComment(e.target.value)}} 
                          />
                          <button className='comment' style={{fontSize:20}} 
                          onClick={() =>{makeComment(comment,item._id);
                          toggleComment();}}
                           >Post</button>
                        </div>
                      
                   </div>
                 </div>
                    <div className="close-comment" onClick={() => {toggleComment()}} > 
                         <span class="material-symbols-outlined material-symbols-outlined-comment ">close</span>
                     </div>         
       </div>

        )}
      </div>
  );
}
