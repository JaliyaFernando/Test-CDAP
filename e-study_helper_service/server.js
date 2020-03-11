'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./lib/configs/settings');
const texts = require('./lib/constants/texts');
const serverMessages = texts.server;

/*Mongo Atlas DB Connection*/
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log(serverMessages.DB_CONNECTED)},
    err => { console.log(serverMessages.DB_NOT_CONNECTED+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*Routes*/
const assignmentHelperRoutes = require('./lib/routes/AssignmentHelper/assignmentHelperRoute');
app.use('/api/assignment-helper', assignmentHelperRoutes);
const quizAnalyzerRoutes = require('./lib/routes/QuizAnalyzer/quizAnalyzerRoute');
app.use('/api/quiz-analyzer', quizAnalyzerRoutes);
const quizletRoutes = require('./lib/routes/Quizlet/quizletRoute');
app.use('/api/quizlet', quizletRoutes);

app.listen(process.env.PORT || config.server.PORT, function(){
    console.log(serverMessages.SERVER_START,config.server.PORT);
});




