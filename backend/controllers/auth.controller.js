/* let users = []; */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.model.js';



export async function register(req,res){
    try{
        const{username, password, email} = req.body;
        const existing = await User.findOne({username});
        if(existing) return res.status(400).send({message: "User exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({username, password: hashedPassword, email});
        await user.save();
    }catch(e){
    console.log(e);
   
    return res.status(500).json(e);
    }
finally{
    res.status(201).json({message: 'User registered sucessfully'});
    }
}
 
   
export async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' });

            res.json({ message: 'Login successful',user, token });
  
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error', error: e.message });
    }
}


    export async function getAllUsers (req, res) {
        try {
            const users = await User.find().select('-password'); 
            res.status(200).json({ users });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Server error', error: e.message });
    }
}
    export async function getByUsername (req, res) {
        try {
            const { username } = req.body;
            const users = await User.find({ username }).select('-password'); 
            res.status(200).json({ users });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Server error', error: e.message });
    }


   
}  

export async function searchUsers (req, res) {
  try {
    const query = req.query.q?.toString() || "";

    const users = await User.find({
      username: { $regex: query, $options: "i" }  // case-insensitive search
    });

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};




/* export const searchUsers = async (req, res) => {
  const { query } = req.query;

  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } }
      ]
    }).select('-password');

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
} */




