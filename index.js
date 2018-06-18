var http = require("http");
var server = http.createServer();
var url = require("url");
var file_system = require("fs");
var my_sql = require("mysql");
//* remote
var my_sql_conn = my_sql.createConnection({
                    host : "www.db4free.net",
                    port : 3306,
                    user : "movie_shop",
                    password : '12345678'
});

//connect to existing remote db
var my_sql_conn_db = my_sql.createConnection({
                    host : "www.db4free.net",
                    port : 3306,
                    user : "movie_shop",
                    password : '12345678',
                    database : "movie_shop"
});
//*/
//local
//establish connection to db server
/*
var my_sql_conn = my_sql.createConnection({
                    host : "localhost",
                    port : 3306,
                    user : "root",
                    password : ''
});

//connect to existing db
var my_sql_conn_db = my_sql.createConnection({
                    host : "localhost",
                    port : 3306,
                    user : "root",
                    password : '',
                    database : "movie_shop"
});
*/


var style = '<style>#home_container{width:25%;height:5%;}#home_container input{width:25%;height:10%;border-radius:0px;border-top:1px dashed white;border-bottom:1px dashed white; font-size:2em}</style>';

var body = '<html><head><title>MovieShop</title>'+
           '<script  src="https://code.jquery.com/jquery-3.3.1.min.js"  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="  crossorigin="anonymous"></script>'+
            '<style>body{background-image:url(https://www.typenetwork.com/assets_content/uploads/ScreenFonts_201610_2-1_ledeCORR.jpg);background-size:fit;background-position:middle;background-repeat:x-repeat;background-color:white;}</style>'+
            '</head>'+
            '<body>'+style+
            '<div id="header_top" style="width:100%;height:4%;background-color:black;color:white;text-align:center">Movie Store</div>'+
            '<span id ="home_container"></span><span id ="home_container"><input type="button" onclick="window.location.href=\'/\'" value="Home" class="btn btn-primary"></span><span id ="home_container"><input type="button" onclick="window.location.href=\'movie_find\'" value="Search" class="btn btn-primary"></span><span id ="home_container"><input type="button" onclick="window.location.href=\'db_add\'" value="Add Movie" class="btn btn-primary"></span>'+
            '<h1 id="heading" style="width:100%;height:7%;background-color:white;color:black;font-size:em;">Hello there</h1><hr>'+
            '<p id ="1"></p><!--<div style="position:static;height:5%;width:100%;top:100%;left:0px;background-color:black"></div>--><!--footer isue-->';

//server
server.on("request",function(request, respond){
   var path = url.parse(request.url).pathname;
   var url_query = url.parse(request.url).query;
    
    //-------------------------------
   var side_navi = file_system.readFile('public/sid_navi.html', function(err, data){
            if(err){
                respond.write('<p style="width:100%;height:10%;overflow:auto;background-color:white;color:black">Side navi couldnt be loaded');
            }
        else{
           respond.write(data);
           // respond.end();//works best here but bad for data requesting functions
        }
    
});
//---------------------------------------
    
    
 respond.writeHead(200);
    respond.write(body);
    
    
   
    //=============================
    //router
    if(path == '/' || path == ''){//if path is home
        home_page(respond);
      // respond.end();
        
    }
    
    if(path == '/mysql'){//path is my sql
        routing(respond);
    }
    if(path == '/db_add'){//path is db add contents
        db_add(url_query, respond);
    }
    
    if(path == '/db_write'){//path is db add contents
        db_write(url_query, respond);
    }
   
    if(path == '/movie_find'){//path is db add contents
        movie_find(url_query, respond);
    } 
    
    if(path == '/movie_find_search'){//path is db add contents
        movie_find_search(url_query, respond);
    }
    if(path == '/movie_find_show_all'){//show all movies on db
        movie_find_show_all(url_query, respond);
    }
    
    if(path == '/movie_delete'){//show all movies on db
        movie_delete(url_query, respond);
    }
    if(path == '/movie_update'){//show all movies on db
        movie_update(url_query, respond);
    }
    if(path == '/data_update_to_db'){//show all movies on db
        data_update_to_db(url_query, respond);
    }
    else{//path is unknown
   // respond.write("<script>document.getElementById('heading').innerHTML ='Incorrect url';</script>")
    //respond.end();
    }
    //==============================
   
    //respond.end();
   
    
    
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//home page
   
function home_page(respond){
     respond.write("<script>document.getElementById('heading').innerHTML ='Home';</script>");  
            
     //get data from db
        my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           // respond.write("<p>connected to db</p>");
             //respond.end();//ending here
        }
         
        //get data from db
        var mysql_db_data_get =  "SELECT * FROM movie_table"
            
       
        //connect to existing db
            
        my_sql_conn_db.query(mysql_db_data_get, function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data adding err (home)"+err+"</p><br><p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>please create a database by clicking this link and adding a movie after <a href='mysql'>CREATE A DATABASE</a></p>");
            
           return ;//respond.end();//ending here
        }
        else{
           // respond.write("<p>Data added "+JSON.stringify(results[0].m_producer)+"</p>");
            var result = results;
            if(result.length==0){return ;}// routing(respond);}//if no db/movie data
            var extra_results = 1;//skip result duplicate
            var count = 0;
            for(var i =0; i<=result.length; i++){
            db_data_shower();//break if setup is not like this
            extra_results =i;//capture duplicate
            count = i;
                
            }
                

            
            //respond.end();//ending here
        }
           function db_data_shower(){
            if(extra_results==0){return}; 
            var color_array=['orange','lime','grey','yellow','coral','mint','white','cyan','pink','beige']; 
            var color_chooser =color_array[Math.floor(Math.random() * 9)];
            respond.write("<p style='width:30%;height:30%;overflow:auto;background-color:"+color_chooser+";color:black;display:inline-block;float:left;margin:1% 1% 1% 1.7%;opacity:0.9;border-radius:2%;'><span style='text-decoration:underline;font-weight:bolder;'>Movie Title : "+result[count].m_title+" </span><br>| Movie Director : "+result[count].m_director+" <br>| Movie Producer : "+result[count].m_producer+" <br>| Movie Producing Company : "+result[count].m_production_company+" <br>| Movie filmed Country : "+result[count].m_country+" <br>| Movie Starring : "+result[count].m_actor+" <br>| Movie Genre : "+result[count].m_genre+" <br>| Movie Synopsis : "+result[count].m_description+" <br>| Movie Disclaimer : "+result[count].m_disclaimer+"</p>");
           }
       }
           
        );             
            
        });
    
            
        }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//mysql table create
function routing(respond){
    respond.write("<script>document.getElementById('heading').innerHTML ='SQL db& table create';</script>")
    my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
           // respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connected to db</p>");
             //respond.end();//ending here
        }
    //create database give a name;
       my_sql_conn.query("CREATE DATABASE movie_shop",function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>DB creation err "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>DB created "+JSON.stringify(results)+"</p>");
             //respond.end();//ending here
        }
           
       }); 
        
        //create db table
        var mysql_db_table ="CREATE TABLE movie_table (movie_id int NOT NULL AUTO_INCREMENT PRIMARY KEY, m_title varchar(255), m_director varchar(255), m_producer varchar(255), m_production_company varchar(255), m_country varchar(255), m_actor varchar(255), m_genre varchar(255), m_description varchar(255), m_disclaimer varchar(255))";
        
        //connect to existing db
        my_sql_conn_db.query(mysql_db_table, function(err, results){
           
        if(err){
        respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>table creation err "+err+"</p>");
           return;// respond.write();//ending here
        }
        else{
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>table created "+results+"</p>");
         //   respond.end();//ending here
        }
           
       }
           
        );
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
//create db moving adding form
function db_add(url_query, respond){
respond.write("<script>document.getElementById('heading').innerHTML ='DB Add data';</script>");
    
    var add_form ='<input type ="text" id="m_title" placeholder="Please enter Movie title" style="width:60%;height:5%; text-align:center;margin-left:20%"><br><input type ="text" id="m_director" placeholder="Please enter Movie director name" style="width:60%;height:5%;text-align:center;margin-left:20%"><br><input type ="text" id="m_producer" placeholder="Please enter Movie producer name" style="width:60%;height:5%;text-align:center;margin-left:20%"><br><input type ="text" id="m_production_company" placeholder="Please enter Movie production company" style="width:60%;height:5%;text-align:center;margin-left:20%"><br><input type ="text" id="m_country" placeholder="Please enter country movie produced in" style="width:60%;height:5%;text-align:center;margin-left:20%"><br><input type ="text" id="m_actor" placeholder="Please enter Movie Starring" style="width:60%;height:5%;text-align:center;margin-left:20%"><br><input type ="text" id="m_genre" placeholder="Please enter Movie genre" style="width:60%;height:5%;text-align:center;margin-left:20%"><br><textarea id="m_description" style="width:60%;height:10%;text-align:center;margin-left:20%">Please give Movie description</textarea><br><input type ="text" id="m_disclaimer" placeholder="Please give Movie disclaimer" style="width:60%;height:5%;text-align:center;margin-left:20%"><hr><input type="button" onclick ="db_write()" value="Save data" style="width:100%;height:10%; border-radius:0px"; class="btn btn-primary">'+ 
  '<script> var  m_title=document.getElementById("m_title");var  m_director=document.getElementById("m_director");var  m_producer=document.getElementById("m_producer");var  m_production_company=document.getElementById("m_production_company");var  m_country=document.getElementById("m_country");var  m_actor=document.getElementById("m_actor");var  m_genre=document.getElementById("m_genre"); var  m_description=document.getElementById("m_description");var  m_disclaimer=document.getElementById("m_disclaimer"); function db_write(){if(m_title.value==""||m_director.value==""||m_producer.value==""||m_production_company.value==""||m_country.value==""||m_actor.value==""||m_genre.value==""||m_description.value==""||m_disclaimer.value==""){ document.getElementById("heading").innerHTML ="Please feel in all information";}else{ window.open("db_write?"+m_title.value+"&"+m_director.value+"&"+m_producer.value+"&"+m_production_company.value+"&"+m_country.value+"&"+m_actor.value+"&"+m_genre.value+"&"+m_description.value+"&"+m_disclaimer.value, "_self");} /*alert(m_title.value+"&"+m_director.value+"&"+m_producer.value+"&"+m_production_company.value+"&"+m_country.value+"&"+m_actor.value+"&"+m_genre.value+"&"+m_description.value+"&"+m_disclaimer.value)*/;}</script>';
    
    respond.write(add_form);
    
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//write data to db
function db_write(url_query, respond){

    // create an array
var data_to_write = url_query.replace(/%20/g, " ").split('&');
    
respond.write("<script>document.getElementById('heading').innerHTML ='DB Add data 2';</script>");
    
  console.log(data_to_write);
    //add data to db table
        my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           // respond.write("<p>connected to db</p>");
             //respond.end();//ending here
        }
         
        //add data to db
        var mysql_db_data_add ="INSERT INTO movie_table (m_title, m_director, m_producer, m_production_company, m_country, m_actor, m_genre, m_description, m_disclaimer) VALUES ('"+data_to_write[0]+"','"+data_to_write[1]+"','" +data_to_write[2]+"','" +data_to_write[3]+"','" +data_to_write[4]+"','" +data_to_write[5]+"','" +data_to_write[6]+"','" +data_to_write[7]+"','" +data_to_write[8]+"')";    
            
       // console.log(mysql_db_data_add);
            //connect to existing db
            
        my_sql_conn_db.query(mysql_db_data_add, function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data adding err(write to db) "+err+"</p>");
           return ;//respond.end();//ending here
        }
        else{
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data added "+JSON.stringify(results)+"</p>");
           return;// respond.end();//ending here
        }
           
       }
           
        );             
            
        });
    //respond.write(url_query);
}
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
//movie search

function movie_find(url_query, respond){
    
    respond.write("<script>document.getElementById('heading').innerHTML ='Movie search';</script>");
    
    var search_input ='<style>input[type=search] {width: 130px;box-sizing: border-box;border: 2px solid #ccc;border-radius: 4px;font-size: 16px;background-color: white;  margin:2% auto 2% 40%;background-image:url("searchicon.png");background-position: 10px 10px;background-repeat: no-repeat;padding: 12px 20px 12px 40px;-webkit-transition: width 0.4s ease-in-out;transition: width 0.4s ease-in-out;}input[type=search]:focus {width: 95%;margin:2% auto 2% auto;}/* #searh_input{margin:2% auto 2% 40%;width: 50%;} */</style><input type="search" name="search" placeholder="Search.." id="search_input" onsearch ="call_db_search()"><button onclick="call_db_search()" style ="width:4%; height:7.5%;font-size:2.3em;border-radius:0px;background-color:transparent;" class="btn btn-info"><i class="fas fa-search"></i></button><br><hr><div id style="width:100%;height:7%;background-color:white;color:black;font-size:1em;"><a href="movie_find_show_all" onclick ="">Show all stored movies</a></div><hr><script> function call_db_search(){ var search_query = document.getElementById("search_input"); if(search_query.value == ""){ document.getElementById("heading").innerHTML ="Please feel data to be searched for";  }  else{            window.open("movie_find_search?"+search_query.value, "_self");       }    }   </script>';

    respond.write(search_input);
    
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//search movie

function movie_find_search(url_query, respond){
    respond.write("<script>document.getElementById('heading').innerHTML ='You searched for : "+url_query.replace(/%20/g, " ")+"';</script>");
    
           var search_input ='<style>input[type=search] {width: 130px;box-sizing: border-box;border: 2px solid #ccc;border-radius: 4px;font-size: 16px;background-color: white;  margin:2% auto 2% 40%;background-image:url("searchicon.png");background-position: 10px 10px;background-repeat: no-repeat;padding: 12px 20px 12px 40px;-webkit-transition: width 0.4s ease-in-out;transition: width 0.4s ease-in-out;}input[type=search]:focus {width: 95%;margin:2% auto 2% auto;}/* #searh_input{margin:2% auto 2% 40%;width: 50%;} */</style><input type="search" name="search" placeholder="Search.." id="search_input" onsearch ="call_db_search()"><button onclick="call_db_search()" style ="width:4%; height:7.5%;font-size:2.3em;border-radius:0px;background-color:transparent;" class="btn btn-info"><i class="fas fa-search"></i></button><br><hr><div id style="width:100%;height:7%;background-color:white;color:black;font-size:1em;"><a href="movie_find_show_all" onclick ="">Show all stored movies</a></div><hr><script> function call_db_search(){ var search_query = document.getElementById("search_input"); if(search_query.value == ""){ document.getElementById("heading").innerHTML ="Please feel data to be searched for";  }  else{            window.open("movie_find_search?"+search_query.value, "_self");       }    }   </script>';


    respond.write(search_input);//search header
    
    
//clean query string
var data_to_search = url_query.replace(/%20/g, " ");  
      
    //get data from db
        my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           // respond.write("<p>connected to db</p>");
             //respond.end();//ending here
        }
         
        //get data from db
            //multiple row search
        var mysql_db_data_get =  "SELECT * FROM movie_table WHERE m_title='"+data_to_search+"' OR m_director='"+data_to_search+"' OR m_producer='"+data_to_search+"' OR m_production_company='"+data_to_search+"' OR m_country='"+data_to_search+"' OR m_actor='"+data_to_search+"' OR m_genre='"+data_to_search+"' OR m_description='"+data_to_search+"' OR m_disclaimer='"+data_to_search+"'";
            
       
        //connect to existing db
            
        my_sql_conn_db.query(mysql_db_data_get, function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data connection error : "+err+"</p>");
           return ;//respond.end();//ending here
        }
        else{
           // respond.write("<p>Data added "+JSON.stringify(results[0].m_producer)+"</p>");
            //console.log(results.length);
            var result = results;
            if(results.length ==0){return  respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Could'nt find movie with any details of whats searched for</p>");}//if record match not found
            var extra_results = 1;//skip result duplicate
            var count = 0;
            for(var i =0; i<=result.length; i++){
            db_data_shower();//break if setup is not like this
            extra_results =i;//capture duplicate
            count = i;
                
            }
                

            
            //respond.end();//ending here
        }
           function db_data_shower(){
            if(extra_results==0){return}   
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Movie Title : "+result[count].m_title+" | Movie Director : "+result[count].m_director+" | Movie Producer : "+result[count].m_producer+" | Movie Producing Company : "+result[count].m_production_company+" | Movie filmed Country : "+result[count].m_country+" | Movie Starring : "+result[count].m_actor+" | Movie Genre : "+result[count].m_genre+" | Movie Synopsis : "+result[count].m_description+" | Movie Disclaimer : "+result[count].m_disclaimer+"</p><hr>");
           }
       }
           
        );             
            
        });
    
}    


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//show all movies    
function movie_find_show_all(url_query, respond){
    respond.write("<script>document.getElementById('heading').innerHTML ='Movie search All';</script>");
    
    var search_input ='<style>input[type=search] {width: 130px;box-sizing: border-box;border: 2px solid #ccc;border-radius: 4px;font-size: 16px;background-color: white;  margin:2% auto 2% 40%;background-image:url("searchicon.png");background-position: 10px 10px;background-repeat: no-repeat;padding: 12px 20px 12px 40px;-webkit-transition: width 0.4s ease-in-out;transition: width 0.4s ease-in-out;}input[type=search]:focus {width: 95%;margin:2% auto 2% auto;}/* #searh_input{margin:2% auto 2% 40%;width: 50%;} */</style><input type="search" name="search" placeholder="Search.." id="search_input" onsearch ="call_db_search()"><button onclick="call_db_search()" style ="width:4%; height:7.5%;font-size:2.3em;border-radius:0px;background-color:transparent;" class="btn btn-info"><i class="fas fa-search"></i></button><br><hr><div id style="width:100%;height:7%;background-color:white;color:black;font-size:1em;"><a href="movie_find_show_all" onclick ="">Show all stored movies</a></div><hr><script> function call_db_search(){ var search_query = document.getElementById("search_input"); if(search_query.value == ""){ document.getElementById("heading").innerHTML ="Please feel data to be searched for";  }  else{            window.open("movie_find_search?"+search_query.value, "_self");       }    }   </script><br>';


    respond.write(search_input);
    
    
        //get data from db
        my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           // respond.write("<p>connected to db</p>");
             //respond.end();//ending here
        }
         
        //get data from db
        var mysql_db_data_get =  "SELECT * FROM movie_table"
            
       
        //connect to existing db
            
        my_sql_conn_db.query(mysql_db_data_get, function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data adding err (serach) "+err+"</p>");
           return ;//respond.end();//ending here
        }
        else{
           // respond.write("<p>Data added "+JSON.stringify(results[0].m_producer)+"</p>");
            var result = results;
            if(results.length ==0){return  respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Could'nt find movie in db, please add some</p>");}//if record match not found
            var extra_results = 1;//skip result duplicate
            var count = 0;
            for(var i =0; i<=result.length; i++){
            db_data_shower();//break if setup is not like this
            extra_results =i;//capture duplicate
            count = i;
                
            }
                

            
            //respond.end();//ending here
        }
           function db_data_shower(){
            if(extra_results==0){return};   
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Movie Title : "+result[count].m_title+" | Movie Director : "+result[count].m_director+" | Movie Producer : "+result[count].m_producer+" | Movie Producing Company : "+result[count].m_production_company+" | Movie filmed Country : "+result[count].m_country+" | Movie Starring : "+result[count].m_actor+" | Movie Genre : "+result[count].m_genre+" | Movie Synopsis : "+result[count].m_description+" | Movie Disclaimer : "+result[count].m_disclaimer+"<br>"+         
            '<input type="button" style="width:40%;height:2em;margin:1% 1% 1% 1%" onclick="window.open(\'movie_update?'+result[count].movie_id+'\',\'_self\')" value="Update Movie" class="btn btn-primary"><input type="button" style="width:40%;height:2em;margin:1% 1% 1% 1%" onclick="window.open(\'movie_delete?'+result[count].movie_id+'\',\'_self\')" value="Delete Movie" class="btn btn-primary"></p>');
           }
       }
           
        );             
            
        });
    
}    

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function movie_delete(url_query, respond){//delete movie
respond.write("<script>document.getElementById('heading').innerHTML ='Movie delete';</script>");
    console.log(JSON.stringify(url_query));
    
    
    
     //get data from db
        my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           // respond.write("<p>connected to db</p>");
             //respond.end();//ending here
        }
         
        //get data from db
        var mysql_db_data_get =  "DELETE FROM movie_table WHERE movie_id='"+url_query+"'";
            
       
        //connect to existing db
            
        my_sql_conn_db.query(mysql_db_data_get, function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data delete err "+err+"</p>");
           return ;//respond.end();//ending here
        }
        else{
           // respond.write("<p>Data added "+JSON.stringify(results[0].m_producer)+"</p>");
            var result = results;
               // console.log(result);
                respond.write("<script>alert('Movie deleted')</script>");
                load_all_movies();
            }
                

            
            //respond.end();//ending here
        }
       
           
        );             
            
        });
    var url_query = url_query;
    var respond = respond;
    
    function load_all_movies(){//call movie load all
        
        movie_find_show_all(url_query, respond);
    }
    
    
    
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function movie_update(url_query, respond){//update movie
respond.write("<script>document.getElementById('heading').innerHTML ='Movie update';</script>");
      // console.log(JSON.stringify(url_query));
    
    
    
    
    //________________________________
    
    
    
    
        //get data from db
        my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           // respond.write("<p>connected to db</p>");
             //respond.end();//ending here
        }
         
        //get data from db
        var mysql_db_data_get =  "SELECT * FROM movie_table WHERE movie_id='"+url_query+"'";
            
       
        //connect to existing db
            
        my_sql_conn_db.query(mysql_db_data_get, function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data adding err (movie update)"+err+"</p>");
           return;// respond.end();//ending here
        }
        else{
           // respond.write("<p>Data added "+JSON.stringify(results[0].m_producer)+"</p>");
            var result = results;
            if(results.length ==0){return  respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Movie update error</p>");}//if record match not found
            console.log(results);
            
            
            
            
        //form with data to update
        var add_form ='<input type ="text" id="m_title" placeholder="Please enter Movie title" style="width:60%;height:5%; text-align:center;margin-left:20%" value="'+result[0].m_title+'"><br><input type ="text" id="m_director" placeholder="Please enter Movie director name" style="width:60%;height:5%;text-align:center;margin-left:20%" value="'+result[0].m_director+'"><br><input type ="text" id="m_producer" placeholder="Please enter Movie producer name" style="width:60%;height:5%;text-align:center;margin-left:20%" value="'+result[0].m_producer+'"><br><input type ="text" id="m_production_company" placeholder="Please enter Movie production company" style="width:60%;height:5%;text-align:center;margin-left:20%" value="'+result[0].m_production_company+'"><br><input type ="text" id="m_country" placeholder="Please enter country movie produced in" style="width:60%;height:5%;text-align:center;margin-left:20%" value="'+result[0].m_country+'"><br><input type ="text" id="m_actor" placeholder="Please enter Movie Starring" style="width:60%;height:5%;text-align:center;margin-left:20%" value="'+result[0].m_actor+'"><br><input type ="text" id="m_genre" placeholder="Please enter Movie genre" style="width:60%;height:5%;text-align:center;margin-left:20%" value="'+result[0].m_genre+'"><br><textarea id="m_description" style="width:60%;height:10%;text-align:center;margin-left:20%">'+result[0].m_description+'</textarea><br><input type ="text" id="m_disclaimer" placeholder="Please give Movie disclaimer" style="width:60%;height:5%;text-align:center;margin-left:20%" value="'+result[0].m_disclaimer+'"><hr><input type="button" onclick ="db_write()" value="Save data" style="width:100%;height:10%; border-radius:0px"; class="btn btn-primary">'+ 
  '<script> var movie_id="'+result[0].movie_id+'"; var  m_title=document.getElementById("m_title");var  m_director=document.getElementById("m_director");var  m_producer=document.getElementById("m_producer");var  m_production_company=document.getElementById("m_production_company");var  m_country=document.getElementById("m_country");var  m_actor=document.getElementById("m_actor");var  m_genre=document.getElementById("m_genre"); var  m_description=document.getElementById("m_description");var  m_disclaimer=document.getElementById("m_disclaimer"); function db_write(){if(m_title.value==""||m_director.value==""||m_producer.value==""||m_production_company.value==""||m_country.value==""||m_actor.value==""||m_genre.value==""||m_description.value==""||m_disclaimer.value==""){ document.getElementById("heading").innerHTML ="Please feel in all information";}else{ window.open("data_update_to_db?"+m_title.value+"&"+m_director.value+"&"+m_producer.value+"&"+m_production_company.value+"&"+m_country.value+"&"+m_actor.value+"&"+m_genre.value+"&"+m_description.value+"&"+m_disclaimer.value+"&'+result[0].movie_id+'", "_self");} /*alert(m_title.value+"&"+m_director.value+"&"+m_producer.value+"&"+m_production_company.value+"&"+m_country.value+"&"+m_actor.value+"&"+m_genre.value+"&"+m_description.value+"&"+m_disclaimer.value)*/;}</script>';
    
    respond.write(add_form);

                
            }
                           
       }
           
        );             
            
        });
    
}
//write updated data to db
function data_update_to_db(url_query, respond){
    
    
    

    
    
      // create an array
var data_to_write = url_query.replace(/%20/g, " ").split('&');
    
respond.write("<script>document.getElementById('heading').innerHTML ='Updating DB';</script>");
    
  console.log(data_to_write);
    //add data to db table
        my_sql_conn.connect(function(err){//doing mysql connection handshake aka test connectability
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>connection error: "+err+"</p>");
            //return respond.end();//ending here
        }
        else{
           // respond.write("<p>connected to db</p>");
             //respond.end();//ending here
        }
         
        //add data to db
        var mysql_db_data_add ="UPDATE movie_table SET m_title='"+data_to_write[0]+"', m_director='"+data_to_write[1]+"', m_producer='"+data_to_write[2]+"', m_production_company='" +data_to_write[3]+"', m_country='" +data_to_write[4]+"', m_actor='" +data_to_write[5]+"', m_genre='" +data_to_write[6]+"', m_description='" +data_to_write[7]+"', m_disclaimer='" +data_to_write[8]+"' WHERE movie_id='"+data_to_write[9]+"'";    
            
       // console.log(mysql_db_data_add);
            //connect to existing db
            
        my_sql_conn_db.query(mysql_db_data_add, function(err, results){
           
        if(err){
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data adding err(update write) "+err+"</p>");
           return ;//respond.end();//ending here
        }
        else{
            console.log(JSON.stringify(results));
            respond.write("<p style='width:100%;height:10%;overflow:auto;background-color:white;color:black'>Data added "+JSON.stringify(results)+"</p>");
            respond.write("<script>alert('Movie deleted')</script>");
            load_all_movies();
        }
           
       }
           
        );             
            
        });
  
    
    function load_all_movies(){//call movie load all
        
        movie_find_show_all(url_query, respond);
    }
    
    
    
    
}


//********************************************************
server.on("close", function(){console.log("connection closed")});

server.listen(3000);