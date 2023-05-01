const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT||8081;
const models = require('./models');
const multer = require("multer");
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

// meets 조회
app.get("/meets", (req, res) => {
  models.Meets.findAll({
    order: [["id", "DESC"]],
    attributes: ["when", "where", "cafe", "who"],
  })
    .then((result) => {
      res.send({ meets: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});

// meets 등록
app.post("/meets",(req, res)=>{
  const body = req.body;
  const {when,where,cafe,who} = body;
  models.Meets.create({
    when,where,cafe,who
  }).then((result)=>{
    console.log(result);
    res.send({result});
  }).catch((error)=>{
    console.log(error);
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