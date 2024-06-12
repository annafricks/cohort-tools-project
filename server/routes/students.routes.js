const router = require("express").Router();

const Student = require("../models/students.models");

router.post("/", async (req, res) => {
    try {
        const createdStudent = await Student.create(req.body);
        res.json(createdStudent);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const findAllStudent = await Student.find().populate("cohort");
        res.json(findAllStudent);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get("/cohort/:cohortId", async (req, res) => {
    try {
        const { cohortId } = req.params;
        const allStudentsFromCohort = await Student.find({cohort:cohortId}).populate("cohort");

        res.json(allStudentsFromCohort);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const singleStudent = await Student.findById(studentId).populate("cohort");

        res.json(singleStudent);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.put("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, {
            new: true,
            runValidators: true,
        });
        res.json({
            message: "Student was updated successfully!",
            student: updatedStudent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.delete("/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        await Student.findByIdAndDelete(studentId);

        res.json({ message: "Student was deleted succesfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router