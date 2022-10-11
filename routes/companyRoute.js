import express from "express";
const router = express.Router();
import Company from "../model/Company.js";

// add new data
router.post("/", async (req, res) => {
    try {
        // find if company exists already with same name or not 
        const getCompany = await Company.findOne({ name: req.body.name });

        if (getCompany) {
            res.send({ msg: "failed", reason: "Company with same name already exists" });
        } else {
            const newData = await Company.create(req.body);
            res.send({ msg: "success", data: newData });
        }

    } catch (error) {
        res.send({ msg: error.message });
    }
})

// get all data
router.get("/", async (req, res) => {
    try {
        const companyData = await Company.find();
        res.send({ msg: "success", data: companyData });

    } catch (error) {
        res.send({ msg: error.message });
    }
})

// get company by ID
router.get("/:id", async (req, res) => {
    try {
        const getCompany = await Company.findOne({ _id: req.params.id });
        res.send({ msg: "success", data: getCompany });

    } catch (error) {
        res.send({ msg: error.message });
    }
})

// update company by ID
router.put("/:id", async (req, res) => {
    try {
        const getCompany = await Company.updateOne({ _id: req.params.id }, { $set: req.body });
        const getUpdatedData = await Company.findOne({ _id: req.params.id });

        if (getCompany.modifiedCount === 1) {
            res.send({ msg: "success", data: getUpdatedData });
        } else {
            res.send({ msg: "failed" });
        }

    } catch (error) {
        res.send({ msg: error.message });
    }
})

// delete company by ID
router.delete("/:id", async (req, res) => {
    try {
        const company = await Company.deleteOne({ _id: req.params.id });

        if (company.deletedCount === 1) {
            res.send({ msg: "success" });
        } else {
            res.send({ msg: "failed" });
        }

    } catch (error) {
        res.send({ msg: error.message });
    }
})

export default router;