"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterQuery = exports.updateBlogSchema = exports.params = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        category: zod_1.z.string().optional(),
        published: zod_1.z.boolean().optional(),
    }),
});
exports.params = zod_1.z.object({
    blogId: zod_1.z.string(),
});
exports.updateBlogSchema = zod_1.z.object({
    params: exports.params,
    body: zod_1.z
        .object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        category: zod_1.z.string(),
        published: zod_1.z.boolean(),
    })
        .partial(),
});
exports.filterQuery = zod_1.z.object({
    limit: zod_1.z.number().default(1),
    page: zod_1.z.number().default(10),
});
