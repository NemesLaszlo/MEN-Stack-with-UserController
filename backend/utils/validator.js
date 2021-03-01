import { check, validationResult } from "express-validator";

const validateUser = [
  check("name")
    .isLength({ min: 2 })
    .trim()
    .withMessage("Name required, which length minimum two characters."),
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid Email required."),
  check("password")
    .isLength({ min: 4 })
    .trim()
    .exists()
    .withMessage("Password required, which length minimum four characters."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.mapped() });
    next();
  },
];

export default validateUser;
