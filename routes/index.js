var express = require('express');
var router = express.Router();

const Reg = require('../db/struct').reg
const url = require('url')
const querystring = require('querystring')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function plusXing (str,frontLen,endLen) { //str：字符串，frontLen：前面保留位数，endLen：后面保留位数。
	var len = str.length-frontLen-endLen;
	var xing = '';
	for (var i=0;i<len;i++) {
		xing+='*';
	}
	return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
}

router.post('/reg',function(req,res){
	let name = req.body.name,
		fakename = plusXing(name,0,1)
		company = req.body.company,
		phone = req.body.phone,
		fakephone = plusXing(phone,3,4),
		regtype = req.body.regtype,
		regmoney = req.body.regmoney,
		ccfhy = req.body.ccfhy,
		ccfxshy = req.body.ccfxshy,
		xuehao = req.body.xuehao,
		regtypename = ''

	switch(regtype){
		case '0':
			regtypename = '院士/特邀报告人'
			break
		case '1':
			regtypename = '专委委员'
			break
		case '2':
			regtypename = 'CCF会员'
			break
		case '3':
			regtypename = 'CCF学生会员'
			break
		case '4':
			regtypename = '学生'
			break
		default:
			regtypename = '其他'
	}
	let reg = new Reg({
		name:name,
		fakename:fakename,
		company:company,
		phone:phone,
		fakephone:fakephone,
		regtype:regtype,
		regtypename:regtypename,
		regmoney:regmoney,
		ccfhy:ccfhy,
		ccfxshy:ccfxshy,
		xuehao:xuehao
	})
	console.log(reg)
	reg.save(function(err){
		if(err){
			console.log('save reg info err-->',err)
			return res.json({'code':'-1','msg':err})
		}
		console.log('save reg info success')
		return res.json({'code':0,'msg':'success'})
	})
})

router.get('/getregdata',function(req,res,next){
	console.log('set header')
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

router.get('/getregdata',function(req,res){
	let urlPath = url.parse(req.url).pathname;
    let qs = querystring.parse(req.url.split('?')[1]);
    console.log('urlPath--->',urlPath)
    console.log('qs--->',qs)
	//这里构造json数据出去
	let search = Reg.find({})
		search.exec(function(err,docs){
			if(err){
				console.log('getregdata err',err)
				return res.end('getregdata err')
			}
			console.log('docs')
			docs = JSON.stringify(docs)
			let callback = qs.callback+'('+docs+');'
			res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
			res.end(callback)
		})
	
    // if(urlPath === '/jsonp' && qs.callback){
    //     res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
    //     var data = {
    //         "name": "Monkey"
    //     };
    //     data = JSON.stringify(data);
    //     var callback = qs.callback+'('+data+');';
    //     res.end(callback);
    // }
    // else{
    //     res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    //     res.end('Hell World\n');    
    // }    
})
module.exports = router;
