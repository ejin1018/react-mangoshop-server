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
  });
  return anonUser;
}