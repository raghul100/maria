//-----------------------------------------------login page call------------------------------------------------------
exports.studentlogin = function(req, res){
   var message = '';
   var sess = req.session; 
 
   if(req.method == "POST"){
      var post  = req.body;
      var name = post.ID;
      var pass= post.DOB;
      
      var sql="SELECT ID,DOB,NAME FROM `student` WHERE `ID`='"+name+"' and DOB = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].ID;
            req.session.user = results[0];
            console.log(results[0].ID);
            res.redirect('/home/studentprofile');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('student.ejs',{message: message});
         }
                  
      });
   } else {
      res.render('student.ejs',{message: message});
   }
            
};

 //-----------------------------------------------login page call------------------------------------------------------
exports.stafflogin = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name = post.ID;
      var pass= post.DOB;
     
      var sql="SELECT ID,DOB,NAME FROM `staff` WHERE `ID`='"+name+"' and DOB = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].ID;
            req.session.user = results[0];
            console.log(results[0].ID);
            res.redirect('/home/staffprofile');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('staff.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('staff.ejs',{message: message});
   }
           
};


 //--------------------------------render user details after login--------------------------------
 exports.studentprofile = function(req, res){

   var userId = req.session.userId;
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/studentlogin");
      return;
   }

   var sql="SELECT * FROM `student` WHERE `ID`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('student.ejs',{data:result});
   });
};

//--------------------------------render user details after login--------------------------------
 exports.staffprofile = function(req, res){

   var userId = req.session.userId;
   userId = req.session.userId;
   if(userId == null){
      res.redirect("/stafflogin");
      return;
   }

   var sql="SELECT * FROM `staff` WHERE `ID`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('staffprofile.ejs',{data:result});
   });
};



//------------------------------------register form in staff login--------------------------------------

exports.register = function(req, res){
   message = '';
  if(req.method == "POST"){
     var post  = req.body;
     var name= post.NAME;
     var id= post.ID;
     var mob_no= post.MOBILE_NO;
     var std= post.STD;
     var sec= post.SEC;

    if (!req.files)
           return res.status(400).send('No files were uploaded.');

     var file = req.files.uploaded_images;
     var img_name=file.name;

        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                
             file.mv('public/images/upload_images/'+file.name, function(err) {
                            
                if (err)

                  return res.status(500).send(err);
                    var sql = "INSERT INTO `student`(`NAME`,`ID`,`MOBILE_NO`,`STD`,`SEC`,`IMAGE`) VALUES ('" + name + "','" + id + "','" + mob_no + "','" + std + "','" + sec + "','" + img_name + "')";

                     var query = db.query(sql, function(err, result) {
                         res.redirect('/home/staffprofile');
                     });
                 });
         } else {
           message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
           res.render('register.ejs',{message: message});
         }
  } else {
     res.render('register');
  }
};
  

 //------------------------------------logout functionality----------------------------------------------
exports.studentlogout=function(req,res){
    req.session.destroy(function(err) {
       res.redirect("/studentlogin");
    })
 };

 //------------------------------------logout functionality----------------------------------------------
exports.stafflogout=function(req,res){
    req.session.destroy(function(err) {
       res.redirect("/stafflogin");
    })
 };


