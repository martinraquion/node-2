const db = {
    users: {
      id: 0,
      data: [],
    },
    profiles: {
      id: 0,
      data: [],
    },
    posts: {
      id: 0,
      data: [],
    },
    comments: {
      id: 0,
      data: [],
    },
  };

const ac = require('./controller/accountController')
const express = require('express');

const app = express();

app.set('db', db);
app.use(express.json())
const port = 3001;

app.listen(port, () => { console.log(`Server listening on port: ${port}`); });

app.post('/sign-up', ac.signUp)
app.patch('/profile/:profileId', ac.updateProfile )
app.get('/debug', ac.debug)
app.post('/post', ac.createPost)
app.post('/comment', ac.addComment)

