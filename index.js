const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require('./models');

app.use(express.json());
app.use(cors());

// products
app.get('/products',(req,res)=>{
  models.Product.findAll({
    order:[['createdAt','DESC']],
    attributes:['id','name','price','seller','imageUrl']
  })
  .then((result)=>{
    console.log('product 조회결과 ',result);
    res.send({product:result});
  }).catch((errors)=>{
    console.error(errors);
    res.send('에러 발생');
  });
})
  // 상품 생성시 데이터 베이스에 추가하기
app.post('/products',(req,res)=>{
  const body = req.body;
  const {name,description,price,seller,imageUrl} = body;

  models.Product.create({
    name,description,price,seller,imageUrl
  }).then((result)=>{
    console.log('상품 생성 결과 ',result);
    res.send({result});
  }).catch((error)=>{
    console.error(error);
    res.send('상품 업로드에 문제가 발생했습니다');
  })

})

// products and event
app.get('/products/:id',(req,res)=>{
  const params = req.params;
  const {id} = params;
  models.Product.findOne({
    where:{id:id},
  }).then((result)=>{
    console.log("조회 결과",result)
    res.send({
      product:result
    })
  }).catch((errors)=>{
    console.error(errors)
    res.send('상품 조회 결과 오류가 발생했습니다.')
  });
})

// login
app.get('/login',(req,res)=>{
  res.send('이건 get이지만 로그인 완료되었습니다.')
})
app.post('/login',(req,res)=>{
  res.send('로그인 완료되었습니다.')
})


// 실행해!
app.listen(port,()=>{
  console.log('👽 서버가 돌아가고 있다 👽');
  models.sequelize.sync().then(()=>{
    console.log('😎 DB 연결 성공');
  }).catch((err)=>{
    console.error(err);
    console.log('👾 연결 에러!');
    process.exit();
  });
})