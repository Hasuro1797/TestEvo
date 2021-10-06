const { Feed } = require("../../../db.js");

const deleteFeed = async (req, res, next) => {
	const { id } = req.params;
	console.log(req.params);
	try {
		await Feed.destroy({
			where: {
				id: id,
			},
		});
		res.send({ success: true });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	deleteFeed,
};
