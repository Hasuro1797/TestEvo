const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('usuario', {
        email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				isEmail: true,
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false	
		}
		
	},{
		timestamps: false,
	});
};