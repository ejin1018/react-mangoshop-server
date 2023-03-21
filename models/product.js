module.exports=(sequelize,DataTypes)=>{
  const product = sequelize.define("Product",{
    name:{
      type:DataTypes.STRING(50),
      allowNull: false,
    },
    price:{
      type:DataTypes.INTEGER(7),
      allowNull: false,
    },
    seller:{
      type:DataTypes.STRING(30),
      allowNull: false,
    },
    description:{
      type:DataTypes.STRING(300),
      allowNull: false,
    },
    imageUrl:{
      type:DataTypes.STRING(300),
      allowNull: true,
    },
    soldout:{
      type:DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue:0
    }
  });
  return product;
}