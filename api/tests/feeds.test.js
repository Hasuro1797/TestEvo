const supertest = require("supertest");
const { conn } = require("../src/db");
const { Usuario, Profile, Feed } = require("../src/db");
const app = require("../src/app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const user1 = {
	email: "manuel179734@gmail.com",
	password: "password",
	name: "Manuel Benjamin",
	lastName: "Villarroel Bedregal",
};
const user2 = {
	email: "manuel179734@gmail.com",
	password: "password",
	name: "Manuel",
	lastName: "Bedregal",
};
const hashPassword = async (user) => {
	const saltRound = 10;
	const salt = await bcrypt.genSalt(saltRound);
	const bcryptPassword = await bcrypt.hash(user.password, salt);
	return bcryptPassword;
};
const createUser = (user) => {
	return new Promise((resolve, reject) => {
		resolve(async () => {
			const newUser = await Usuario.create({
				email: user.email,
				password: await hashPassword(user),
			});
			const profile = await Profile.create({
				name: user.name,
				lastName: user.lastName,
			});
			await profile.setUsuario(newUser.email);
		});
		reject((error) => console.error(error));
	});
};
const setUser = createUser(user1);
describe("Routes", () => {
	beforeAll(async () => {
		await conn.sync({ force: true });
	});
	afterAll(async () => {
		await conn.sync({ force: true });
		conn.close();
	});
	describe("Authentication", () => {
		beforeEach(async () => {
			await Usuario.sync({ force: true });
		});
		test("Should register a user", () => {
			return api
				.post("/user/register")
				.send(user1)
				.expect(200)
				.then((res) => {
					expect(res.body.user.email).toEqual(user1.email);
				});
		});
		test("Should not register a user without sufficient data", () => {
			const newUser = {
				email: "manuel179734@gmail.com",
				password: "password",
				name: "",
				lastName: "Villarroel Bedregal",
			};
			return api
				.post("/user/register")
				.send(newUser)
				.expect(401)
				.then((res) => {
					expect(res.body.message).toEqual(
						"Did not receive enough data to create new user"
					);
				});
		});
		test("Should not register a user that has the same email.", () => {
			return Usuario.create(user1).then(() => {
				return api
					.post("/user/register")
					.send(user2)
					.expect(401)
					.then((res) => {
						expect(res.body.message).toEqual("User currently exists");
					});
			});
		});
		test("Should log in if all the parameters are passed.", async () => {
			const userLog = {
				email: "manuel179734@gmail.com",
				password: "password",
			};
			return setUser.then(async () => {
				const res = await api.post("/user/login").send(userLog);
				console.log("el res es ", res.body);
				expect(res.body).toEqual({ message: "User invalidated" });
			});
		});
		// test("should not log in if all not the parameters are passed.", async () => {
		// 	let userLog = {
		// 		email: "manuel179734@gmail.com",
		// 		password: "",
		// 	};
		// 	Usuario.create({
		// 		email: user1.email,
		// 		password: await hashPassword(user1),
		// 	}).then(async () => {
		// 		const res = await api.post("/user/login").send(userLog).expect(401);
		// 		expect(res.body.message).toEqual("User invalidated");
		// 	});
		// });
		// test("should not log in if receive wrong email.", async () => {
		// 	let userLog = {
		// 		email: "manuel17973@gmail.com",
		// 		password: "password",
		// 	};
		// 	Usuario.create({
		// 		email: user1.email,
		// 		password: await hashPassword(user1),
		// 	}).then(() => {
		// 		return api
		// 			.post("/user/login")
		// 			.send(userLog)
		// 			.expect(401)
		// 			.then((res) => {
		// 				expect(res.body.message).toEqual("User invalidated");
		// 			});
		// 	});
		// });
		// test("should not log in if receive wrong email.", async () => {
		// 	const userLog = {
		// 		email: "manuel17973@gmail.com",
		// 		password: "password",
		// 	};
		// 	Usuario.create({
		// 		email: user1.email,
		// 		password: await hashPassword(),
		// 	}).then(() => {
		// 		return api
		// 			.post("/user/login")
		// 			.send(userLog)
		// 			.expect(401)
		// 			.then((res) => {
		// 				expect(res.body.message).toEqual("User invalidated");
		// 			});
		// 	});
		// });
		// test("should not log in if receive wrong password.", async () => {
		// 	const userLog = {
		// 		email: "manuel17973@gmail.com",
		// 		password: "password",
		// 	};
		// 	Usuario.create({
		// 		email: user1.email,
		// 		password: await hashPassword(),
		// 	}).then(() => {
		// 		return api
		// 			.post("/user/login")
		// 			.send(userLog)
		// 			.expect(401)
		// 			.then((res) => {
		// 				expect(res.body.message).toEqual("User invalidated");
		// 			});
		// 	});
		// });
	});
});
