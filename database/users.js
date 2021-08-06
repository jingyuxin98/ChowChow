var  mongodb=require("mongoose");
var  db=require("./db.js");

var  USERPAGESIZE=8;

var userSchema=new mongodb.Schema({
    username: String ,
    password: String, 
    avatar: String, 
    registDate:{type:Date},
    salt: String
})

//创建静态方法-----------------------------------------------

//创建用户
userSchema.statics.insertUser= function (json,callback) {
    this.model("user").create(json, function (err,result) {
        if(err){
            console.log(err);
            return
        }
        //result是一个对象
        callback(result)
    })
}


//根据分页查找所有用户
userSchema.statics.findAllUser= function (page,callback) {
    var skip=(page-1)*USERPAGESIZE;
    var that=this
    this.model("user").find({}).limit(USERPAGESIZE).skip(skip).sort({registDate:-1}).exec(function (err,result) {
        if(err){
            console.log("查找错误")
            return
        }
        //查用户总数
        that.model("user").find({}).count().exec(function (err,result2) {

            callback(result,result2)
        })
    })
}

userSchema.statics.findOneUser= function (json,callback) {
    this.model("user").findOne(json).sort({registDate:-1}).exec(function (err,result) {
        if(err){
            console.log("查找错误")
            return
        }
        callback(result)
    })
}

//更新用户
userSchema.statics.updateUser= function (json,condition,callback) {
    this.model("user").update(json,condition, function (err,result) {
        if(err){
            console.log(err)
            return
        }
      callback(result)
    })
}

//创建模型
var userModel=db.model("user",userSchema);

//暴露模型
module.exports=userModel



