const { DataTypes } = require('sequelize');
//Exportamos por modulo la funcion que define el modelo de las actividades
module.exports = (sequelize) => {
    //definimos el modelo.
    sequelize.define('feed', {
        title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false	
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false	
		},
		payment: {
			type: DataTypes.BOOLEAN,
			allowNull: false	
		},
		img: {
			type: DataTypes.STRING,
			allowNull: false	
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false	
		},

	});
};