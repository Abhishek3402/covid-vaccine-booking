const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const Admin = require('../Models/AdminModel');

module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user)
            return res.json({msg: "Incorrect E-Mail or Password", status: false});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({msg: "Incorrect E-Mail or Password", status: false});
        return res.json({ status: true});
    }
    catch(ex) {
        next(ex);
    }
}

module.exports.register = async (req, res, next) => {
    try {
        const {email, name, password, phoneno, acard} = req.body;
        const emailCheck = await User.findOne({ email });
        const acardCheck = await User.findOne({ acard });
        if (emailCheck)
            return res.json({ msg: "E-Mail already used", status: false })
        if (acardCheck)
            return res.json({ msg: "Aadhaar number already registered", status: false })
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: email,
            name: name,
            password: hashedPassword,
            phoneno: phoneno,
            acard: acard,
          });
          return res.json({msg: "Account Created!", status: true, user });
        } 
    catch (ex) {
        next(ex);
        }
}

module.exports.adminLogin = async (req, res, next) => {
    try {
        const {uname, password} = req.body;
        const admin = await Admin.findOne({uname});
        if (!admin)
            return res.json({msg: "Incorrect Username or Password", status: false});
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid)
            return res.json({msg: "Incorrect Username or Password", status: false});
        return res.json({ status: true});
    }
    catch(ex) {
        next(ex);
    }
}