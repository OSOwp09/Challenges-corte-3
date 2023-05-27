const express = require("express");
const TaskScheme = require("../models/TaskScheme");

const crearTask = async (req, res = express.request) => {
	const task = new TaskScheme(req.body);

	try {
		task.user = req.uid;
		const saved = await task.save();
		return res.json({
			ok: true,
			task: saved,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			task: "internal Error",
		});
	}
};

const listarTask = async (req, res = express.request) => {
	const tasks = await TaskScheme.find().populate("user", "name");

	try {
		return res.status(200).json({
			ok: true,
			tasks,
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			task: "internal Error",
		});
	}
};

// Challenge 18
const actualizarTask = async (req, res = express.request) => {

    const {_id, title } = req.body
    console.log(_id, title)

	try {
		const updatedTask = await TaskScheme.findByIdAndUpdate(
			_id,
			{title: title},
			{ new: true }
		);

        console.log(updatedTask)
		if (!updatedTask) {
			return res.status(404).json({
				ok: false,
				message: "Task not found",
			});
		}

		return res.status(200).json({
			ok: true,
			task: updatedTask,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			task: "Internal Error",
		});
	}
};

const eliminarTask = async(req, res = express.request)=>{
    const {_id } = req.body
    
    try {
        const deletedTask = await TaskScheme.findByIdAndDelete(_id);
        if (!deletedTask) {
            return res.status(404).json({
                ok: false,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            ok: true,
            task: deletedTask,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            task: "Internal Error",
        });
    }
}
//---------------

module.exports = {
	crearTask,
	listarTask,
    actualizarTask,
    eliminarTask
};
