import mongoose, { Schema } from "mongoose";

const formSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    fathersName: {
      type: String,
      required: true,
    },
    parentsGuardianCNIC: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    campus: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    studentCNICBForm: {
      type: Number,
      required: true,
      index:true,
    },
    dob: {
      type: Date,
      required: true,
    },
    parentsGuardianContact: {
      type: Number,
      required: true,
    },
    studentContact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    passingYear: {
      type: Number,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    obtainedMarks: {
      type: Number,
      required: true,
    },
    boardRollNo: {
      type: Number,
      required: true,
    },
    avtarFile: {
      type: String,
      required: true,
    },
    termsAndConditions: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", formSchema);
