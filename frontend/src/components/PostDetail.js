import React from 'react'
import "../css/PostDetail.css";
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';


export default function PostDetail({item,toggleDetails}) {
const navigate = useNavigate();

     //toast functions
     const notifyA = (msg) => toast.error(msg)
     const notifyB = (msg) => toast.success(msg)

  const removePost=(postId) =>{
    const removePost = (postId) => {
      if(window.confirm("Do you really want to delete this post?")){
        fetch(`http://localhost:5000/deletePost/${postId}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
    }).then((res) =>res.json())
    .then((result) =>{
      console.log(result);
      toggleDetails();
      navigate("/");
      notifyB(result.message);
    })

      }
    }
    
  } ;
  return (
    <div className="showComment">
        <div className="container">
          <div className="postPic">
          <img src={item.photo} alt="" />
           
            <div className="details">
            <div className='card-header' style={{borderBottom: "1px solid #00000029"}}>
                 <div className='card-pic'>
                     <img src="https://images.unsplash.com/photo-1546019170-f1f6e46039f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGh1bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"alt=" "/>
                       {/* <img src="" alt=""></img> */}
                  </div>
        
                 <h3>{item.postedBy.name}</h3>
                 <div className="deletePost" onClick={() =>{removePost(item._id)}}>
                 <span className="material-symbols-outlined">delete</span>
                 </div>

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
                          <input type="text" placeholder="Add a comment"
                          //  value={comment} 
                          // onChange={(e) =>{setComment(e.target.value)}} 
                          />
                          <button className='comment' style={{fontSize:20}} 
                          // onClick={() =>{makeComment(comment,item._id);
                          // toggleComment();}}
                           >Post</button>
                        </div>
                      
                   </div>
                 </div>
                    <div className="close-comment" 
                    onClick={() => {toggleDetails()}}
                     > 
                         <span class="material-symbols-outlined material-symbols-outlined-comment ">close</span>
                     </div>         
       </div>
  )
}
