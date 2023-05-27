const express = require("express");
require("dotenv").config();
const { dbConnection } = require("../daatabase/config");
const cors = require("cors");

class Server {
	constructor() {
		this.headers = {
			cors: {
				origin: "http://127.0.0.1:5500",
				methods: ["GET", "POST"],
			},
		};
		
		// Crear express App
		this.app = express();
		this.port = process.env.PORT;
		this.server = require("http").createServer(this.app);

		this.paths = {
			auth: "/api/auth",
		};

		this.connectToDB();
		this.addMiddleware();
		this.setRoutes();
	}

	//Base de datos
	async connectToDB() {
		await dbConnection();
	}

	addMiddleware() {
		//CORS
		this.app.use(cors());

		//Lectura y paseo del body
		this.app.use(express.json());

		//Public folder
		this.app.use(express.static("public"));
	}

	setRoutes() {
		//Rutas
		this.app.use(this.paths.auth, require("../routes/auth"));
	}


	listen() {
		//Escuchar puerto 4000
		this.server.listen(this.port, () => {
			console.log("servidor corriendo en puerto", process.env.PORT);
		});
	}
}

module.exports = Server;

