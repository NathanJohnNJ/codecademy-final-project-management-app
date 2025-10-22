require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const usersRouter = require('./src/routes/users');
const teamRouter = require("./src/routes/teams");
const taskRouter = require("./src/routes/tasks");
const projectRouter = require("./src/routes/projects");
const authRouter = require('./src/routes/auth');
const authMiddleware = require('./src/middleware/auth');

const User = require("./src/models/userModel");
const Team = require("./src/models/teamModel");
const Task = require("./src/models/taskModel");
const Project = require("./src/models/projectModel");
// const syncTables = () => {
//     User.sync({ alter: true });
//     Team.sync({ alter: true });
//     Task.sync({ alter: true });
//     Project.sync({ alter: true });
//     User.hasMany(Project);
//     User.hasMany(Team);
//     User.hasMany(Task);
//     Team.hasMany(Task);
//     Team.hasMany(Project);
//     Team.hasMany(User);
//     Project.hasMany(Task);
//     Project.hasMany(User);
//     Task.belongsTo(Project);
//     Project.belongsTo(Team);
// }

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', authMiddleware, usersRouter);
app.use('/api/projects', authMiddleware, projectRouter);
app.use('/api/tasks', authMiddleware, taskRouter);
app.use('/api/teams', authMiddleware, teamRouter);

app.get('/', (req, res) => res.send('Project Manager backend running'));

app.listen(port, () => {
  // syncTables();
  console.log(`Server listening on port ${port}`)
});
