const { validationResult, query } = require("express-validator");
const createError = require('http-errors');

const notFoundUrl = (req, res, next) => {
    const er = createError(404, 'url not found', {
        errors: {
            url: {
                msg: "request url not found"
            }
        }
    });
    next(er);
}

const errorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({
        msg: err.message || "Internal server error",
        errors: err.errors || undefined
    })
}

const validatorHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        next();
    } else {
        const mappedErrors = errors.mapped();
        const err = createError(406, 'validation failed', {
            errors: mappedErrors
        });
        next(err);
    }
}

const paginationValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page should be number and minimum value 1")
]

module.exports = {
    notFoundUrl,
    errorHandler,
    validatorHandler,
    paginationValidator
}