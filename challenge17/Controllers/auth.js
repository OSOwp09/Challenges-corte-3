const express = require("express");
const bycrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generateJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.request) => {
	const { name, email, password } = req.body;
	try {
		let usuario = await Usuario.findOne({ email: email });
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: "El usuario con ese correo ya exite",
			});
		}

		usuario = new Usuario(req.body);
		const salt = bycrypt.genSaltSync();
		usuario.password = bycrypt.hashSync(password, salt);
		await usuario.save();

		return res.status(200).json({
			ok: true,
			usuario,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			error,
		});
	}
};

//-----challenge 17---------
const loginUsuario = async (req, res = express.request) => {
	const { email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ email: email });
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: "El usuario NO existe",
			});
		}

		const passwordValid = bycrypt.compareSync(password, usuario.password);
		if (!passwordValid) {
			return res.status(400).json({
				ok: false,
				msg: "El usuaio NO es valido",
			});
		}

		const token = await generateJWT(usuario.id, usuario.name);

		res.status(200).json({
			ok: true,
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error,
		});
	}
};
//----------------------------

const revalidarToken = async (req, res = express.request) => {
	const { uid, name } = req;

	const token = await generateJWT(uid, name);

	return res.json({
		ok: true,
		token,
	});
};

const listarUsuarios = async (req, res = express.request) => {
	const usuarios = await Usuarios.find().populate("tareas", "title");

	try {
		return res.status(200).json({
			ok: true,
			usuarios,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error interno",
		});
	}
};

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
	listarUsuarios,
};
