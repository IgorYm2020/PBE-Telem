const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://raspberry:<password>@pbe-2022.xyouvub.mongodb.net/?retryWrites=true&w=majority"
const database = "PBE";

function getParams(query) {
}

async function getFromDB(table, query) {
	const client = new MongoClient(uri);
	try {
		let limit = 0;
		if (query.has("limit")) {
			limit = parseInt(query.get("limit"));
			query.delete("limit");
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
	console.log(query)
	try {
		const result = await client
			.db(database)
			.collection("students")
			.find(query)
			.project({ _id: 0 })
			.toArray();
		console.log("Result: " + result);
		return result.length === 1;
	} finally {
		await client.close();
	}
}

exports.auth = auth;
exports.getFromDB = getFromDB;