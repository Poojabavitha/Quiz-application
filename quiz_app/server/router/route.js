import {Router} from "express";
import *as controller from '../controllers/controller.js';

const router = Router();


/*Question Routes */
// router.get('/questions',controller.getQuestions)

router.route('/questions')
   .get(controller.getQuestions)//Get request
   .post(controller.insertQuestions)// post request
   .delete(controller.dropQuestions)// delete request

router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult)
        .delete(controller.dropResult)


export default router;