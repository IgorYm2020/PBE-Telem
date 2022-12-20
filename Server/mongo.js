const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://raspberry:<password>@pbe-2022.xyouvub.mongodb.net/?retryWrites=true&w=majority"
const database = "PBE";

function getParams(query) {
}

function formatNumber(number) {
	return number < 10 ? "0" + number : "" + number;
}

async function getFromDB(table, query) {
	const client = new MongoClient(uri);
	try {
		let limit = 0;
		if (query.has("limit")) {
			limit = parseInt(query.get("limit"));
			query.delete("limit");
		}

		if (query.get("date") === "now") {
			const today = new Date()
			const year = formatNumber(today.getFullYear());
			const month = formatNumber(today.getMonth());
			const day = formatNumber(today.getDay());
			query.set("date", year + "-" + month + "-" + day);
		}

		const result = [];
		return await client
			.db(database)
			.collection(table)
			.find(query)
			.project({ _id: 0 })
			.toArray();
	} finally {
		await client.close();
	}
}

async function auth(query) {
	const client = new MongoClient(uri);
	try {
		const result = await client
			.db(database)
			.collection("students")
			.find(query)
			.project({ _id: 0 })
			.toArray();
		return result.length === 1;
	} finally {
		await client.close();
	}
}

exports.auth = auth;
exports.getFromDB = getFromDB;