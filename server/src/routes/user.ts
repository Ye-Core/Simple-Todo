import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser)

router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
export default router;