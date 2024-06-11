const mongoose = require ("mongoose")
const Schema = mongoose.Schema;

//CREATE SCHEMA
//Schema - describes and enforces the structure of the documents
const cohortSchema = newSchema({cohortSlug:{type: String, unique: true, required: true},
cohortName:{type: String, required: true},
program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "CyberSecurity"]},
format: {type: String, enum: ["Full Time", "Part Time"]},
campus: {type: String, enum:["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
startDate: {type: Date, default: Date.now}, endDate: {type:Date},
inProgress: {type:Boolean},
programManager: {type: String, required: true},
leadTeacher: {type: String, required: true},
totalHours: {type: Number, default: 360}
});

const cohort = mongoose.model("Cohort", cohortSchema)

//EXPORT THE MODEL
module.exports = cohort;