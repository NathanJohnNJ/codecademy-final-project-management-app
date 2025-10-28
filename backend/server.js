require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

const usersRouter = require('./src/routes/users');
const teamRouter = require("./src/routes/teams");
const taskRouter = require("./src/routes/tasks");
const projectRouter = require("./src/routes/projects");
const authRouter = require('./src/routes/auth');
const authMiddleware = require('./src/middleware/auth');
const setupDatabase = require('./src/db/dbSetup').setupDatabase;
app.use(cors());
app.use(express.json());
setupDatabase();

app.use('/api/auth', authRouter);

app.use('/api/users', authMiddleware, usersRouter);
app.use('/api/projects', authMiddleware, projectRouter);
app.use('/api/tasks', authMiddleware, taskRouter);
app.use('/api/teams', authMiddleware, teamRouter);

try{
  app.get('/', async (req, res) => {
    res.send('Project Manager backend running'
  )});

  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
  });
} catch (error){
  console.error(error);
} 

