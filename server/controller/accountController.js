function signUp(req, res) {
    const db = req.app.get('db')
    const{ email, password } = req.body
    const id = db.users.id
    const name = email.toUpperCase()
    db.users.data.push({id, email, password})
    db.profiles.data.push({id, email, name})
    db.users.id++
    db.profiles.id++
    res.status(201).json(db)
    
 }

 function debug(req, res) {
    res.status(200).json(req.app.get('db'))
 }

 function updateProfile(req, res){
    const db = req.app.get('db')
    const {profileId} = req.params;
    const profileIndex = db.profiles.data.findIndex(profile => profile.id === parseInt(profileId))
    const profile = [db.profiles.data[profileIndex]];
    Object.assign(...profile, req.body)
        
    res.status(200).json(profile)

}

 function createPost(req, res){
    const db = req.app.get('db')
    const { userId, posts } = req.body
    const id = db.posts.id
    db.posts.data.push({id, posts, userId})
    db.posts.id++
    res.status(201).json(db)
 }

 function addComment(req, res){
     const db = req.app.get('db')
     const {userId, postId, comment} = req.body
     const id = db.comments.id 
     db.comments.data.push({
        id,
        userId,
        postId,
        comment
    })
    db.comments.id++
    res.status(201).json(db)
 }

 function getProfile(req, res){
   const db = req.app.get('db')
   const userEmail = req.query.email
   const userId = Number(req.query.id)
   const userIndex = db.users.data.findIndex(res => res.email === userEmail);
   const userIndexById = db.users.data.findIndex(res => res.id === userId);
   if(req.query.email){
      res.status(200).json(db.users.data[userIndex])
   }else if(req.query.id){
      res.status(200).json(db.users.data[userIndexById])
   }else{
      res.status(200).json(db)
   }
 }

 

 module.exports = {
     signUp,
     debug,
     updateProfile,
     createPost,
     addComment,
     getProfile
 }