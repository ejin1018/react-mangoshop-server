module.exports = (Sequelize,DataTypes) =>{
  const anonUser = Sequelize.define("AnonUser",{
    email:{
      type:DataTypes.STRING(30),
      allowNull:false
    },
    password:{
      type:DataTypes.STRING(30),
      allowNull:false
    },
    nickname:{
      type:DataTypes.STRING(10),
      allowNull:false
    },
    calendar:{
      type:DataTypes.STRING(10000),
      allowNull:true
    },
    movingday:{
      type:DataTypes.STRING(10),
      allowNull:true
    }
  });
  return anonUser;
}