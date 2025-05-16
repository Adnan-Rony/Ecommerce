
import  express  from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { addReview, getallReviews } from '../controllers/reviewController.js';

const router = express.Router();


router.post("/:productId",verifyToken,addReview)
router.get("/:productId",getallReviews)





export default router;