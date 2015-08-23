var io = require('socket.io').listen(3000);
var twitter = require('./config/twitter');
var app = {sockets: []};

io.sockets.on('connection', function(socket){
    console.log("Got a connection...");
    app.sockets.push(socket);
});

twitter.stream('statuses/filter', { track: 'hearsayhackday, hshackday, hearsayhackday, hearsay hackday, hearsay hack day, @hearsayhackday' }, function(stream){
    stream.on('data', function(tweet){
        console.log(tweet.text);
        if(app.sockets.length > 0){
            io.emit('tweet', tweet);
        }
    });

    stream.on('error', function(error){
        console.log(error); 
    });
});
