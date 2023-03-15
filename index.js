const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require('./models');

app.use(express.json());
app.use(cors());

// products
app.get('/products',(req,res)=>{
  models.Product.findAll()
  .then((result)=>{
    console.log('product 조회결과 ',result);
    res.send({product:result});
  }).catch((errors)=>{
    console.error(errors);
    res.send('에러 발생');
  });
  
  // res.send({
  //   "products": [
  //       {
  //           "id": 1,
  //           "name": "내추럴발란스 피쉬엔치킨 그레인프리",
  //           "price": "8,500",
  //           "seller": "내추럴코어",
  //           "imageUrl": "images/products/food1.jpg"
  //       },
  //       {
  //           "id": 2,
  //           "name": "멍멍 하네스",
  //           "price": "32,000",
  //           "seller": "도기멍",
  //           "imageUrl": "images/products/acc1.jpg"
  //       },
  //       {
  //           "id": 3,
  //           "name": "배변패드 흡수혁멍",
  //           "price": "7,500",
  //           "seller": "도기멍",
  //           "imageUrl": "images/products/house1.jpg"
  //       },
  //       {
  //           "id": 4,
  //           "name": "닥터소프트 그레인프리 오리/노령견용 1.2kg",
  //           "price": "27,000",
  //           "seller": "닥터소프트",
  //           "imageUrl": "images/products/food3.jpg"
  //       },
  //       {
  //           "id": 5,
  //           "name": "트로벳 유리너리 asd 신장 사료 강아지용",
  //           "price": "41,000",
  //           "seller": "트로벳",
  //           "imageUrl": "images/products/food2.jpg"
  //       },
  //       {
  //           "id": 6,
  //           "name": "마약 방석",
  //           "price": "25,000",
  //           "seller": "콩콩독",
  //           "imageUrl": "images/products/house2.jpg"
  //       },
  //       {
  //           "id": 7,
  //           "name": "보들보들 폼폼 도그웨어",
  //           "price": "18,000",
  //           "seller": "도그하우스",
  //           "imageUrl": "images/products/toy1.jpg"
  //       }
  //   ]
  // })
})
  // 상품 생성시 데이터 베이스에 추가하기
app.post('/products',(req,res)=>{
  const body = req.body;
  const {name,description,price,seller,imageUrl} = body;

  models.Product.create({
    name,description,price,seller,imageUrl
  }).then((result)=>{
    console.log('상풍 생성 결과 ',result);
    res.send({result});
  }).catch((error)=>{
    console.error(error);
    // res.send('상품 업로드에 문제가 발생했습니다');
  })

})

// products and event
app.get('/products/:id/events/:eventId',(req,res)=>{
  const params = req.params;
  const {id,eventId} = params; // destructuring 구조분해할당
  res.send(`id는 ${id} 입니다 eventId는 ${eventId} 입니다`)
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