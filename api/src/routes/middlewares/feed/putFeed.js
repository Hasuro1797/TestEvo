const { Feed } = require("../../../db.js");

const putFeed = async (req, res, next) => {
	const { feedId, title, price, status, payment, img, description } = req.body;
	try {
		if (title) {
			await Feed.update(
				{
					title: title,
				},
				{
					where: {
						id: feedId,
					},
				}
			);
		}
		if (price) {
			await Feed.update(
				{
					price: price,
				},
				{
					where: {
						id: feedId,
					},
				}
			);
		}
		if (status) {
			await Feed.update(
				{
					status: status,
				},
				{
					where: {
						id: feedId,
					},
				}
			);
		}
		if (payment) {
			await Feed.update(
				{
					payment: payment,
				},
				{
					where: {
						id: feedId,
					},
				}
			);
		}
		if (img) {
			await Feed.update(
				{
					img: img,
				},
				{
					where: {
						id: feedId,
					},
				}
			);
		}
		if (description) {
			await Feed.update(
				{
					description: description,
				},
				{
					where: {
						id: feedId,
					},
				}
			);
		}
		const feeds = await Feed.findAll({
			where: {
				usuarioEmail: req.user,
			},
		});
		res.send({ feeds });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	putFeed,
};
