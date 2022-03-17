const Task = require('../models/Task');

// 全てのタスクを取得
const getAllTasks = async (req, res) => {
    try {
        const getAllTask = await Task.find({});
        res.status(200).json(getAllTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

// タスクを生成
const createTask = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

// 特定のタスクを取得
const getSingleTask = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({ _id: req.params.id });
        if (!getSingleTask) {
            return res
                .status(404)
                .json(`_id: ${req.params.id}は存在しません。`);
        }
        res.status(200).json(getSingleTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

// 特定のタスクを更新
const updateTask = async (req, res) => {
    try {
        const updataTask = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        );
        if (!updataTask) {
            return res
                .status(404)
                .json(`_id: ${req.params.id}は存在しません。`);
        }
        res.status(200).json(updataTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

// 特定のタスクを削除
const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });
        if (!deleteTask) {
            return res
                .status(404)
                .json(`_id: ${req.params.id}は存在しません。`);
        }
        res.status(200).json(deleteTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};
