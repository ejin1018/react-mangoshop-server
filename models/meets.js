module.exports = (sequelize, DataTypes) => {
	const meets = sequelize.define("Meets", {
		when:{
      type:DataTypes.STRING(10),
      allowNull:false
    },
		where:{
      type:DataTypes.STRING(30),
      allowNull:false
    },
		cafe:{
      type:DataTypes.STRING(30),
      allowNull:false
    },
		who:{
      type:DataTypes.STRING(10),
      allowNull:false
    },
    sango:{
      type:DataTypes.STRING(300),
      allowNull:true
    },
    aek:{
      type:DataTypes.STRING(300),
      allowNull:true
    },
    gugu:{
      type:DataTypes.STRING(300),
      allowNull:true
    },
    ejin:{
      type:DataTypes.STRING(300),
      allowNull:true
    },
	});
  return meets;
};