import mongoose from "mongoose";

const FilterSchema = mongoose.Schema({
    AcademicNames:Array,
    CompanyNames:Array,
    ContractType:Array
})


const Filter = mongoose.model("Filter",FilterSchema)

export default Filter