"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const blog_controller_1 = require("../controller/blog.controller");
const blog_schema_1 = require("../controller/blog.schema");
const router = express_1.default.Router();
router
    .route("/")
    .get(blog_controller_1.findAllBlogsController)
    .post((0, validate_1.validate)(blog_schema_1.createBlogSchema), blog_controller_1.createBlogController);
router
    .route("/:blogId")
    .get(blog_controller_1.findBlogController)
    .patch((0, validate_1.validate)(blog_schema_1.updateBlogSchema), blog_controller_1.updateBlogController)
    .delete(blog_controller_1.deleteBlogController);
exports.default = router;
