import React,{useEffect,useState} from 'react'
import "../css/Profile.css";
import PostDetail from '../components/PostDetail';
import ProfilePic from '../components/ProfilePic';

export default function Profile() {
  var picLink ="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [ pic,setPic ] =useState([]);
  const [ show,setShow ] =useState(false);
  const [ posts,setPosts ] =useState([]);
  const [ user,setUser ] =useState("");
  const [ changePic,setChangePic ] =useState(false);

    //to show and hide details
    const toggleDetails= (posts) =>{
      if(show){
        setShow(false);
      }else{
        setShow(true);
        setPosts(posts);
      }
    };

    const changeProfile =() =>{
      if(changePic){
        setChangePic(false)
      } 
      else{
        setChangePic(true)
      }
    }
  

  useEffect(() => {
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("jwt"),
       },
    })
    .then(res => res.json())
    .then((result) => {
      setPic(result.post)
      setUser(result.user)
      console.log(pic)
    })
  }, [])

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img onClick={changeProfile} src={user.Photo ? user.Photo:picLink}  alt="" /> 
        </div>
        <div className='profile-data'>
           <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className='profile-info' style={{display:"flex"}}>
            <p>{pic? pic.length:"0"} posts </p>
            <p>{user.followers? user.followers.length:"0"} followers </p>
            <p>{user.following? user.following.length:"0"} following</p>
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
        {pic.map((pics) =>{
          return <img key={pics._id} src={pic.photo}
          onClick= {() =>{
            toggleDetails(pics)
          }}
          className='item'></img>
        })}
      </div>
      {show && <PostDetail item={posts} 
      toggleDetails={toggleDetails}
      />}
      {
      changePic && <ProfilePic changeProfile={changeProfile} />
      }
    </div>
  )
}
