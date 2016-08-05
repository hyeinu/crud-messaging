
//getAll is a function that is being returned when called in the app.js
//cb is callback
//we need the callback because within the function getAll there is asynchronous things happen

const fs = require('fs');
const path = require('path'); //create file path
const uuid = require('uuid')
const dataFilePath = path.join(__dirname, '../data/messages.json') //give us an absolute path



exports.getAll = function(cb){
  fs.readFile(dataFilePath, (err, buffer) =>{
    if (err) return cb(err)

    let msgs;

    try{
      msgs = JSON.parse(buffer);
    } catch(err){
      return cb(err);
    }

    cb(null, msgs)
  });
}

exports.create = function(msgObj, cb){
    this.getAll(function(err, msgs){
      if (err) return cb(err);
      msgObj.id = uuid.v4();
      msgs.push(msgObj);
      fs.writeFile(dataFilePath, JSON.stringify(msgs), function(err){
        cb(err);
      })
    });
}

exports.getOne = function(msgId, cb){
  this.getAll(function(err, msgs){
    if (err) return cb(err);
  let msg = msgs.filter(msg => msg.id == msgId)[0]
    cb(null || msg);
  });
}

exports.update = function(msgId, msgbody, cb){

  this.getAll(function(err, msgs){ //reading and parsing
    if (err) return cb(err);
    let msg = msgs.filter(msg => msg.id === msgId)[0]
    if(!msg){
      return cb({error: 'Message not found'});
    }
    let index = msgs.indexOf(msg);

    for(let key in msg){
      msg[key] = msgbody[key] || msg[key];
    }

    msgs[index] = msg;

    fs.writeFile(dataFilePath, JSON.stringify(msgs), function(err){
      cb(err);
    })
  });
}

exports.delete = function(msgId, cb){
  this.getAll(function(err, msgs){ //reading and parsing
    if (err) return cb(err);
    msgs = msgs.filter(msg => msg.id !== msgId)

      fs.writeFile(dataFilePath, JSON.stringify(msgs), function(err){
        cb(err);
      })
  });
}
