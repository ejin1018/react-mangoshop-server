module.exports = (sequelize, DataTypes) => {
	const todo = sequelize.define("Todo", {
		subject:{
			type:DataTypes.STRING(100),
			allowNull:false,
		},
		description:{
			type:DataTypes.STRING(300),
			allowNull:true,
		},
		completed:{
			type:DataTypes.INTEGER(1),
			allowNull:false,
			defaultValue:0,
		},
	});
  return todo;
};