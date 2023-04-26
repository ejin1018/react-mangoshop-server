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
	});
  return meets;
};