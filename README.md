project function description
===

* This project implements  a chatroom of multi person by use of nodejs,the module of socket.io.

* It's divided into two parts: client and server.

* The demo is derived from https://github.com/plhwin/nodejs-socketio-chat, it modifies some codes and gives an detail explanation of that project,It tries to make it easier to run on others' computers.
the client part is refers to a blog(http://blog.chinaunix.net/uid-30247287-id-5054082.html)

project operation environment 
===

* os: ubuntu16.04 64bit
* node version: v5.8.0
* some modules shown as follows
![](/home/ding/Pictures/1.png) 

* editor: vim & WebStorm 


How to run the project
===
*  Firstly, git clone this project or **fork** it
```
git clone https://github.com/doctording/nodejs_socket.io_chatroom
```

* Secondly, run the server and client 
```
$ cd server
$ node app.js

$ cd client
$ node app.js 
```
you should modify the codes first,as you can see in index.html, the ip address should be your computer's ip address,and if there are some erros,please keep pationce to solve bugs.


* Then,you can enter the IP request address(htttp:your ip:your port/) in the browser ,shown as follows
![](/home/ding/Pictures/运行截图.png) 

* Lastly, you can modify the project as you can to make it more useful and accessible.

Codes details
===
you should use socket.io.js in your html,and I copy the socket.io.js,then in html, we can include such file（notice that the ip should be yours）
```
<script src="http://192.168.1.116:3000/socket.io/socket.io.js"></script>
```

----

you shuold know socket.io's methods of **on()** and **emit()**

* in server, the login function code as follows

```
// 监听新用户加入
	socket.on('login', function(obj){
		// 将新用户的唯一标志当作socket的名称
		socket.name = obj.userid;
		
		// 检查在线列表，如果不在里面就加入 
		// × 对象的hasOwnPropery方法判断一个对象是否有名称的属性或对象
		if(!onlineUsers.hasOwnProperty(obj.userid)){
			onlineUsers[obj.userid] = obj.username;
			// 在线人数+1
			onlineCount++;
		}

		// 像所有客户端广播用户加入
		io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
		console.log(obj.username+'加入了聊天室');
	});
```

* in client, some codes as follows
```
<div style="width:260px;margin:200px auto;">
        请先输入你在聊天室的昵称
        <br/>
        <br/>
        <input type="text" style="width:180px;" placeholder="请输入用户名" id="username" name="username" />
        <input type="button" style="width:50px;" value="提交" onclick="usernameSubmit()"/>
    </div>
```

```
 <script>
      
        var socket = io.connect('http://192.168.1.116:3000'); // ip需要换成自己服务端的ip

        var username = null;
        var userid = null;

        //监听新用户登录
        socket.on('login', function(o){
            updateSysMsg(o, 'login');
        });

        function usernameSubmit()
        {
            username = document.getElementById("username").value;
            if(username != ""){
                document.getElementById("username").value = '';
                document.getElementById("loginbox").style.display = 'none';
                document.getElementById("chatbox").style.display = 'block';
                //init(username);

                userid = new Date().getTime()+""+Math.floor(Math.random()*899+100);
                document.getElementById("showusername").innerHTML = username;

                socket.emit('login', {userid:userid, username:username});

    </script>
```

* if debug the project , we can see how data is transmitted clearly.

...
===
