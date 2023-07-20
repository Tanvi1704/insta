import React,{useEffect,useState} from 'react'
import "../css/Profile.css";
import PostDetail from './PostDetail';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const {userid} = useParams();
  const [ isFollow,setIsFollow ] =useState(false);
  const [ user,setUser ] =useState("");
  const [ posts,setPosts ] =useState([]);

//to follow user
const followerUser =(userId) => {
    fetch("http://localhost:5000/follow",{
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
       },
       body:JSON.stringify({
        followId:userId
       })
    }).then(res => res.json())
    .then((data) => {
        console.log(data)
        setIsFollow(true)
   
    })
}

//to unfollow user
const unfollowerUser =(userId) => {
    fetch("http://localhost:5000/unfollow",{
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
       },
       body:JSON.stringify({
        followId:userId
       })
    }).then(res => res.json())
    .then((data) => {
        console.log(data)
        setIsFollow(false)
   
    })
}

  useEffect(() => {
    fetch(`http://localhost:5000/${userid}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("jwt"),
       },
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
      setUser(result.user);
      setPosts(result.post);
      if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
        setIsFollow(true)
      }     
    })
  }, [isFollow])

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aHVtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60" alt="" /> 
        </div>
        <div className='profile-data'>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h1>{user.name}</h1>
            <button className='followBtn' onClick={()=>{
                if(isFollow){
                    unfollowerUser(user._id)
                }else{
                    followerUser(user._id)
                }
                
                
            }} >
                {isFollow ? "Unfollow" : "Follow"}
            </button>
            </div>
          
          <div className='profile-info' style={{display:"flex"}}>
            <p>{posts.length} posts </p>
            <p>{user.followers ?  user.followers.length:"0"} followers </p>
            <p>{user.following ?  user.following.length:"0"} following</p>
          </div>
        </div>
      </div>
      <hr style={{width:"90%",opacity:"0.8",margin:"30px auto"}} />
      <div className='gallery'>
        {/* <img src="https://plus.unsplash.com/premium_photo-1676490356616-187aa70384a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60" alt="" ></img>
        <img src="https://images.unsplash.com/photo-1681814307672-cdf12038887a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60" alt="" ></img>
        <img src="https://images.unsplash.com/photo-1682003885863-75dc005bf91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60" alt="" ></img>
        <img src="https://images.unsplash.com/photo-1681853176751-46a2f15cc30a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60" lt=""></img>
        <img src="https://images.unsplash.com/photo-1681841839180-80f83f373404?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60" lt=""></img>
        <img src="https://images.unsplash.com/photo-1681841839112-87caaf6b0c9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60" lt=""></img>
        <img src="https://images.unsplash.com/photo-1681846054164-0284797babbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60" lt=""></img>
         */}
        {posts.map((pics) =>{
          return <img key={pics._id} src={pics.photo}
        //   onClick= {() =>{
        //     toggleDetails(pics)
        //   }}
          className='item'></img>
        })}
      </div>
      {/* {show && <PostDetail item={posts} 
      toggleDetails={toggleDetails}
      />} */}
      
    </div>
  )
}
