const Cohorts = require("../models/cohorts.model.js")
const router = require ("express").Router()

router.post("/", async(req,res)=>{
    try{
        const createdCohort= await Cohorts.create(req.body)

        res.status(201).json({message:"made a cohort", createdCohort})
    } catch(error){
        console.log(error)
        res.status(500).json(error)

    }
})
router.get("/:cohortId", async(req,res)=>{
    try{
        const {cohortId}=req.params
        const singleCohort= await Cohorts.findById(cohortId)

        res.status(201).json(singleCohort)
    }catch(error){
        console.log("single cohort error", error)
        res.status(500).json(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const cohorts = await Cohorts.find()
        res.json(cohorts)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

router.put("/:cohortId", async (req,res)=>{
    try{
        const {cohortId}=req.params
        const updatedCohort=await Cohorts.findByIdAndUpdate(cohortId, req.body, {new:true, runValidators:true,})
        res.status(201).json({message: "updated cohort", cohorts: updatedCohort})
    } catch(error){
        console.log("update cohort error", error)
        res.status(500).json(error)
    }
})
router.delete("/:cohortId", async(req,res)=>{
    try{
        const {cohortId}=req.params
        const deleteCohort= await Cohorts.findByIdAndDelete(cohortId)

        res.status(201).json({message:"successfuly deleted cohort", deleteCohort})
    }catch(error){
        console.log("delete cohort error", error)
        res.status(500).json(error)
    }
})
module.exports = router
