"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uuid_1 = require("uuid");
var patientSchema = new mongoose_1.Schema({
    patientId: { type: String, unique: true, required: true, default: function () { return genUniqueId(); } },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    status: { type: String, required: true },
    extra_fields: { type: Map, of: mongoose_1.Schema.Types.Mixed, default: {} }
});
function genUniqueId() {
    return (0, uuid_1.v4)();
}
exports.default = mongoose_1.default.model('Patient', patientSchema);
