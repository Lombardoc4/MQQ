const socketio  = require('socket.io');

module.exports.listen = (server) => {
  var username;
  io = socketio.listen(server);

  io.on('connection', function(socket){
    console.log('connected: ' + socket.id);
    username = socket.id;

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
      io.emit('chat message', username + ' : ' + msg);
    });
    socket.on('add user', function(user){
      console.log(user);
      io.emit('add user', user);
    });
  });
  return io;
}
