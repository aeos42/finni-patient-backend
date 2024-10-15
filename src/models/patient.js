"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var patientSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    status: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Patient', patientSchema);
