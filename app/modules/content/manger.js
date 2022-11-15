import User from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Post from '../../models/post'

export default class Manger {

    RegisterUsr = async (requestData) => {
      const emailexist=await User.findOneData({email:requestData.email})
      if(emailexist) return 'email already exists.'
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(requestData.password, salt);
      return await new User({ ...requestData, password: hashedPass }).saveData()
     };

     LoginUsr=async(requestData)=> {
      const user =await User.findOneData({email:requestData.email})
      if(!user) return 'user not exist'
      const pass = await bcrypt.compare(requestData.password, user.password);
      if (!pass) return "Password is Incorrect";
      await User.findOneAndUpdateData({email:requestData.email},{isLogin:true})
      const token =jwt.sign({_id:user._id},process.env.SECRETKEY,{expiresIn:"1h",})
     return await User.findOneAndUpdateData({email:requestData.email},{token:token})
     }
     GetUsr=async(requestData)=> {

      const user =await User.findOneData({_id:requestData.query.userid})
      if(!user) return "user not found"
      return user
     }
     UpdateUsr =async(requestData)=>
     {
      const updateuser=await User.findOneAndUpdateData({_id:requestData.userid},requestData)
      if(!updateuser) return "invaid user"
      return updateuser
     }
     CreateUserPost =async (requestData)=>
     {
      const post = await new Post(requestData)
      if(!post) return 'invaid post'
      return await post.saveData();
     }
     GetPostbyuser =async(requestData)=>{
      const post = await Post.findData({createdBy:requestData.query.userId})
      if(!post) return 'invaid post'
      return post 
     }
      UpdatepostbyUser=async(requestData)=>
      {
        const UpdatePost= await Post.findOneAndUpdateData({_id:requestData._id},requestData)
        if(!UpdatePost) return "invaid post"
        return UpdatePost
      }
       
    LikePostByuser=async(requestData)=>{
   // 
   let checkpost=await Post.findOne({_id:requestData.postid})
   if(!checkpost) return "no post available";
   let isLiked ;
   let newLikes=checkpost.likes;
   
   if(newLikes.includes(requestData.id)) {
    let index=newLikes.indexOf(requestData.id)
     newLikes.splice(index,1)
    isLiked = false;
    }else{
    newLikes.push(requestData.id)
    isLiked = true;
   }
   const updateLike= await Post.findOneAndUpdateData({_id:requestData.postid},{likes:newLikes,})
  if(!updateLike) return "invaid request"
  return {updateLike,isLiked}
    }  
  PostComment=async(requestData)=>{
    const Commentpost=await Post.findOneAndUpdateData({_id:requestData.postid},
      {$push: { ...requestData  } })
    if(!Commentpost) return "invaid Post"
    return Commentpost.comments
     
  }
  deletePost =async(requestData)=>{
    const deletepost=await Post.findOneAndDelete({_id:requestData.postid})
    if(!deletepost) return "post is not there"
    return "deleted successfully"
  }
  sharepost =async (requestData)=>{
    const post =await Post.findOne({_id:requestData.postid})
    if(!post) return "invaid post"
    if(post.createdby==requestData.user) return "you can't share your own post"  
     const resharedpost=await Post.findOneAndUpdateData({_id:requestData.postid},
      {$push: { ...requestData  } })
    if(!resharedpost) return "request data error"
  return resharedpost;
    
  }
searchpost =async(requestData)=>{
    const post =await Post.find(
     { $or: [
        { creator: { $regex: requestData.query.searchkey, $options: "i" } },
        { title: { $regex:requestData.query.searchkey, $options: "i" } },
      ]}
    );
    if(!post)return "post not found"
    return post 
  }

}
