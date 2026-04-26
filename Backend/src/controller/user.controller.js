import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const login = async (req , res) => {
    const { username , password } = req.body;
    if(!username || !password) {
        return res.status(400).json({ message: "Please Provide"})
    }
    try {
        const user = await User.find(username);
        if(!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found"})
        }
        if(bcrypt.compare(password , user.password)){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token })
        }

    } catch(e) {
        return res.status(500).json({ message: `Somenthing went wrong ${e}`})
    }
}

const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(httpStatus.CONFLICT)
                .json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
        });

        await newUser.save();

        return res
            .status(httpStatus.CREATED)
            .json({ message: "User registered successfully" });

    } catch (e) {
        res.json({ message: `Somenthing went wrong ${e}`})
    }
};

export default register;