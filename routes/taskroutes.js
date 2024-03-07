const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET all tasks
router.get('/tasks', async (req, res) => {
    try {
    const tasks = await Task.find();
    res.json(tasks);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});
//create a task
router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(200).json({ message: "created successfully",task });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message })
    }
})
router.put('/tasks/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({ message: "updated successfully",task });
    } catch (error) {
        console.log("Error in updating the task");
        res.status(400).json({ error: err.message })
    }
})
router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id)
        res.status(200).json({ message: 'Deleted Successfully' })
    } catch (error) {
        console.log("Error In deleting The Task")
        res.status(400).json({ Error : err.message })
    }
})

module.exports = router;