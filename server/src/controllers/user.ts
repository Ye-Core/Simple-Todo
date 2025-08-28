import { Request, Response } from "express";
import {User} from "../models/user";
import generateToken from "../utils/generateToken";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

export const registerUser = asyncHandler(async(req : Request, res : Response) => {
    const {username, email, password} = req.body;

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        username,
        email,
        password
    });

    if (user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            
        })
    }else {
        res.status(400);
        throw new Error("User not created");
    }

});

export const loginUser = asyncHandler(async(req: Request, res: Response) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({
        email
    });

    if (existingUser && await existingUser.matchPassword(password)){
        generateToken(res, existingUser._id);
        res.status(200).json({
             _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
}
);

export const logoutUser = asyncHandler(async(req: Request, res: Response) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
});

export const getUserProfile = asyncHandler(async(req: AuthRequest, res: Response) => {
    const user = {
        _id : req.user?._id,
        username : req.user?.username,
        email : req.user?.email,
    }
    res.status(200).json(user);
});

export const updateUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    console.log("Updating user profile", req.user);
    
    const user = await User.findById(req.user?._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();

    const selectedUser = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    };
    res.status(200).json(selectedUser);
  }
);

