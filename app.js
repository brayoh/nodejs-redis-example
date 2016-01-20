var redis = require('redis');
var client = redis.createClient(); // creates a new redis client
//check for connection
client.on('connect',function(){
    console.log("connected");
});
// setting key store values
client.set('brian','njenga',function(err, reply){
	console.log(reply);
});
//set key with expiry -  in seconds
client.set('name','brian njenga');
client.expire('name',40);

//getting key store value
client.get('brian',function(err, reply){
	console.log(reply);
});

//storing a hash - equal to row in MySQL and documents in NoSQL
client.hmset('frameworks', {
   'javascript': 'AngularJS',
          'css': 'Bootstrap',
         'node':'Express'
});

//return an object of the stored hash
client.hgetall('frameworks', function(err, object) {
       console.log(object);
});

//store a list in redis while pushing elements to the right
client.rpush(['jsframeworks','angularjs','reactjs','jquery'],function(err, reply){
	console.log(reply);//prints 3 - number of items in list
});

//store a list while pushing elements to the left

client.lpush(['node_modules','express','body-parser'], function(err, reply){
	console.log(reply);//prints 2
});

//retrieve elements in the list
client.lrange('node_modules', 0, -1, function(err, object){
	console.log(object);
});

//using sets in redis

/*******************************************************************
**** NB: sets are almost like lists but they dont allow duplicates***
*********************************************************************/

client.sadd(['tags', 'angular','ember','backbone'], function(err, reply){
	console.log(reply); // prints 3
});

//retrieve values of the set
client.smembers('tags', function(err, reply){
	console.log(reply);
});

//check if clients exists
client.exists('tags',function(err, reply){
	if(reply === 1) 
		console.log('exists');
	else
		console.log('doesnt exist');
});
//deleting keys
client.del('frameworks', function(err, reply){
	console.log(reply);
});
//incrementing values
client.set('key1', 10, function() {
    client.incr('key1', function(err, reply) {
        console.log(reply); // 11
    });
});

//decerementing values
client.set('key2', 10, function() {
    client.decr('key2', function(err, reply) {
        console.log(reply); // 9
    });
});


//thats it you are now set to start using redis cache in your projects, its fast and awesome
