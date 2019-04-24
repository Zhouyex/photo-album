var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

var app = express();


app.set('view engine','ejs');
//静态资源加载
app.use(express.static('./upload/'))
app.get('/',(req,res)=>{
   

    //在upload.ejs页面中渲染出select框框
    var dataOp= {
        ops:['lol','web']
    }
    res.render('index',dataOp);

    //渲染上传文件的页面
    // res.render('upload',dataOp);
  
    // res.send('成功');

});

//============跳转页面=================================================
app.get('/upload.ejs',(req,res)=>{
    var dataOp= {
        ops:['lol','web']
    }
    res.render('upload',dataOp);
})


//每个相册的展示

app.get('/lol.ejs',(req,res)=>{
    
    fs.readdir('./upload/lol/',(err,data)=>{
        if(err){res.send('图片目录读取失败！')}
        else{
            var imgList = {
                imgs:data
            }
            res.render('lol',imgList)

        }
    })

    // res.render('lol',);
})


app.get('/web.ejs',(req,res)=>{
    // res.render('web');
    fs.readdir('./upload/web/',(err,data)=>{
        if(err){res.send('图片目录读取失败！')}
        else{
            var imgList = {
                imgs:data
            }
            res.render('web',imgList)

        }
    })
})


app.get('/index.ejs',(req,res)=>{

    var dataOp= {
        ops:['lol','web']
    }
    res.render('index',dataOp);
})



//当用户提交图片时候 POST
app.post('/upload.ejs',(req,res)=>{
    var form = new formidable.IncomingForm();
    //图片暂存文件夹
    form.uploadDir = './temp/';
    //处理表单提交数据 （这里只处理上传文件）
    form.parse(req,(err,filed,file)=>{
        //可以
        // console.log(file,1111);
        // if(!file){
        //     return
        // }
        //用这个去判断不同的option 不同的读取
        console.log(filed);
        
        //上传到不同路径中
        console.log(filed.op);
        var clasPath = filed.op
        //使用fs.rename 将图片改名放到upload文件夹中
        // 放到各自的文件夹中
        var oldDir = file.pic.path;
        var newDir = 'upload/'+clasPath+'/'+new Date().getTime()+path.extname(file.pic.name);


        fs.rename(oldDir,newDir,(err)=>{
            if(err){res.send('文件上传失败！')}
            else{
                //可以
                res.send('文件上传成功');


                // --------以下不执行--------------
                //把图片渲染到页面上 读目录..render..
                //这个时候注意使用  静态资源加载
                // fs.readdir('./upload/',(err,data)=>{
                //     if(err){res.send('图片目录读取失败！')}
                //     else{
                //         var imgList = {
                //             imgs:data
                //         }
                //         res.render('showimg',imgList)

                //     }
                // })
                //读取目录完毕

            }
        })

    })

})

app.listen(7777);

