"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogController = exports.findAllBlogsController = exports.findBlogController = exports.updateBlogController = exports.createBlogController = void 0;
const model_1 = __importDefault(require("../model/model"));
//create blog
const createBlogController = async (req, res) => {
    try {
        const { title, description, category, published } = req.body;
        const blog = await model_1.default.create({
            title, description, category, published,
        });
        res.status(201).json({
            status: "success",
            data: {
                blog,
            },
        });
    }
    catch (error) {
        //can't record blogs with the same title
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "error",
                message: error.message,
            });
        }
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.createBlogController = createBlogController;
// to edit Blog
const updateBlogController = async (req, res) => {
    try {
        const result = await model_1.default.update({ ...req.body, updatedAt: Date.now() }, {
            where: {
                id: req.params.blogId,
            },
        });
        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }
        //to retrieve the updated record
        const blog = await model_1.default.findByPk(req.params.blogId);
        res.status(200).json({
            status: "success",
            data: {
                blog,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.updateBlogController = updateBlogController;
//find one blog
const findBlogController = async (req, res) => {
    try {
        const blog = await model_1.default.findByPk(req.params.blogId);
        if (!blog) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                blog,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.findBlogController = findBlogController;
// get all blogs
const findAllBlogsController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const blogs = await model_1.default.findAll({ limit, offset: skip });
        res.status(200).json({
            status: "success",
            results: blogs.length,
            blogs,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.findAllBlogsController = findAllBlogsController;
//delete blog
const deleteBlogController = async (req, res) => {
    try {
        const result = await model_1.default.destroy({
            where: { id: req.params.blogId },
            force: true,
        });
        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Blog not found",
            });
        }
        // to return to client
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
exports.deleteBlogController = deleteBlogController;
