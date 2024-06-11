const mongoose = require ("mongoose")

const Schema = mongoose.Schema;

//CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
    firstName:{type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    phone: {type: String, required: true},
    linkedInUrl: {type: String, default: ""},
    languages: {type: Array, enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]},
    program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    background: {type: String, default: ""},
    image: {type: String, default: "https://imgur.com/r8bo8u7"},
    cohort: {type: ObjectId.cohort}, 
    projects: {type: String}
});
