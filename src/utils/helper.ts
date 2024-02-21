import path from "path";
import { unlink } from "fs";
import util from "util";
import multer from "multer";

/**
 * Formats the express-validator error message
 * @param {object} error - The error object
 * @returns {CustomError} - The formatted error object
 * @example
 * const errors = validationResult(req).formatWith(customErrorFormatter);
 * if (!errors.isEmpty()) {
 *   return next(new AppError("Invalid request data", 400, errors.array()));
 * }
 */
const customErrorFormatter = ({ path, msg }: any): CustomError => {
  return {
    field: path,
    message: msg,
  };
};

/**
 * Multer configuration for file uploads.
 */
const fileUpload: multer.Multer = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (_, file, cb) => {
      return cb(null, `${file.originalname}`);
    },
  }),
});

/**
 * Promisified version of the Node.js `unlink` function using `util.promisify`.
 */
const unlinkFile = util.promisify(unlink);

const currencies = {
  stripe: ["USD"],
  paystack: ["NGN"],
};

export { customErrorFormatter, fileUpload, unlinkFile, currencies };
