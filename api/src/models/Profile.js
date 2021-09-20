const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('profile', {
        name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false	
		}
		
	},{
		timestamps: false,
	});
};