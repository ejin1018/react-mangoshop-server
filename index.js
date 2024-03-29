const express = require("express");
const cors = require("cors");
const models = require('./models');
const multer = require("multer");

const app = express();
const port = process.env.PORT||8081;

const upload = multer({
  storage:multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,"uploads/");
    },
    filename:function(req,file,cb){
      cb(null,file.originalname);
    }
  })
});

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"));

// image
app.post('/image',upload.single('image'),(req,res)=>{
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl:file.path
  })
})

// when we met 
// meets 조회
app.get("/meets", (req, res) => {
  models.Meets.findAll({
    order: [["id", "DESC"]],
    attributes: ["id","when", "where", "cafe", "who","sango","aek","gugu","ejin"],
  })
    .then((result) => {
      res.send({ meets: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});

// meets id별로 조회
app.get("/meets/:id",(req,res)=>{
  const params = req.params;
  const { id } = params;
  models.Meets.findOne({
    where: { id: id },
    attributes: ["id","when", "where", "cafe", "who","sango","aek","gugu","ejin"],
  })
    .then((result) => {
      res.send({ meets: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
})

// meets 등록
app.post("/meets",(req, res)=>{
  const body = req.body;
  const {when,where,cafe,who} = body;
  models.Meets.create({
    when,where,cafe,who
  }).then((result)=>{
    res.send({result});
  }).catch((error)=>{
    console.log(error);
  })
})

// record 등록
app.post("/meets/:id",(req,res)=>{
  let {id} = req.params;

  models.Meets.update(
    {
      sango:req.body.sango,
      aek:req.body.aek,
      gugu:req.body.gugu,
      ejin:req.body.ejin
    },
    {where:{id}}
  )
  .then((record)=>{
    console.log('기록 등록 성공',record);
  })
  .catch((err)=>{
    console.log('기록 등록 실패',err)
  })

})

// meets 삭제
app.delete("/meets/:id",(req,res)=>{
  const {id} = req.params;
  models.Meets.destroy({where:{id}}).then(()=>{
    res.send('delete.')
  }).catch((err)=>{
    res.send(err)
  })
})

// an on
// anonUser 조회
app.get("/anonuser",(req,res)=>{
  models.AnonUser.findAll({
    order:[["id","DESC"]],
  })
  .then((result)=>{
    res.send({anonUser:result});
    console.log("get an on user")
  })
  .catch((err)=>{
    console.log(err);
    res.send("안온 회원 조회 실패");
  })
})
// anonUser 추가 (회원가입)
app.post("/anonuser",(req,res)=>{
  const body = req.body;
  const {email,password,nickname} = body;
  models.AnonUser.create({
    email,password,nickname
  }).then((result)=>{
    res.send({result});
  }).catch((error)=>{
    console.log(error)
  })
})
// anonUser id 별로 조회
app.get("/anonuser/:id",(req,res)=>{
  const params = req.params;
  const { id } = params;
  models.AnonUser.findOne({
    where: { id: id },
  })
  .then((result)=>{
    res.send({anonUser:result});
    console.log("get an on user")
  })
  .catch((err)=>{
    console.log(err);
    res.send("안온 회원 조회 실패");
  })
})
// anonUser calendar,movingday 등록
app.post("/anonuser/:id",(req,res)=>{
  const { id } = req.params;
  
  models.AnonUser.update(
    {
      calendar:req.body.calendar,
      movingday:req.body.movingday
    },
    {where:{ id }}
  )
  .then((record)=>{
    console.log('일정 등록 성공',record);
  })
  .catch((err)=>{
    console.log('일정 등록 실패',err)
  })
})

// 실행해!
app.listen(port,()=>{
  models.sequelize.sync().then(()=>{
    console.log('👽 서버가 돌아가고 있다 👽');
  }).catch((err)=>{
    console.error(err);
    console.log('👾 연결 에러!');
    process.exit();
  });
})