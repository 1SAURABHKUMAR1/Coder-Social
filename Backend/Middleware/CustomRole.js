const CustomError = require('../Utils/CustomError');

exports.customRole = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(
                CustomError(
                    res,
                    'You are not authorized to visit this url',
                    403,
                ),
            );
        }
        next();
    };
};
