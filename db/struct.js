/**
 *  @Author:    chenrongxin
 *  @Create Date:   2018-8-24
 *  @Description:   存储结构
 */

    const mongoose = require('mongoose')
    mongoose.Promise = global.Promise;
    //服务器上
    const DB_URL = 'mongodb://nasac2018reg:youtrytry@localhost:27017/nasac2018reg'
    //本地
    //const DB_URL = 'mongodb://localhost:27017/dxxxhjs'
    mongoose.connect(DB_URL)

    /**
      * 连接成功
      */
    mongoose.connection.on('connected', function () {    
        console.log('Mongoose connection open to ' + DB_URL);  
    });    

    /**
     * 连接异常
     */
    mongoose.connection.on('error',function (err) {    
        console.log('Mongoose connection error: ' + err);  
    });    
     
    /**
     * 连接断开
     */
    mongoose.connection.on('disconnected', function () {    
        console.log('Mongoose connection disconnected');  
    });   

//var mongoose = require('./db'),
    let Schema = mongoose.Schema,
    moment = require('moment')

var regSchema = new Schema({ 
    email:{type:String},
    name : {type:String},
    fakename:{type:String},
    company : {type:String},
    phone : {type:String},
    fakephone:{type:String},
    regtype : {type:String},
    regtypename : {type:String},
    regmoney : {type:String},       
    ccfhy:{type:String},
    ccfxshy:{type:String},
    xuehao:{type:String},
    state:{type:Number,default:0},//状态0未交费，1核查中，2缴费成功
    needpj:{type:Number,default:0},//是否需要票据，0否1是
    pjtt:{type:String},//票据抬头
    swh:{type:String},//税务号
    kpje:{type:String},//开票金额
    regtime :{type:String,default:moment().format('YYYY-MM-DD')},
    createTime : {type:String, default : moment().format('YYYY-MM-DD HH:mm:ss') },//创建时间
    createTimeStamp : {type:String,default:moment().format('X')}//创建时间戳
})



exports.reg = mongoose.model('reg',regSchema);
