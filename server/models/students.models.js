const mongoose = require ("mongoose")

const Schema = mongoose.Schema;
 
// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    email:{type: String, unique:true, required:true} ,
    phone:{type:String, require:true},
    linkedinUrl:{type:String, default:""},
    languages:{type: [String], enum:[ "English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]},
    program:{type:String, enum:["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    background: {type:String, default:""},
    image: {type:String, default:"https://imgur.com/r8bo8u7"},
    cohort: {type: Schema.Types.ObjectId, ref:"Cohort"},
    projects: {type:[String]}
});
 

const Student = mongoose.model("Student", studentSchema)
 
// EXPORT THE MODEL
module.exports = Student;