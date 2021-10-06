const { Feed } = require("../../../db.js");

const postFeed = async (req, res, next) => {
	const { title, price, status, payment, img, description } = req.body;
	try {
		if (title && price && status && img && description) {
			const feed = await Feed.create({
				title,
				price,
				status,
				payment,
				img,
				description,
			});
			await feed.setUsuario(req.user);
			res.send({ feed });
		} else {
			res.status(422).send({ message: "The data is not enough." });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	postFeed,
};
