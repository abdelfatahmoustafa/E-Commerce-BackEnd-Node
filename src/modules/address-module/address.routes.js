
import { Router } from 'express';
import * as all from './address.controller.js';
const addressRouter = Router();
addressRouter.post('/:userId',all.addAddress);
addressRouter.get('/:userId',all.getUserAddresses);

export default addressRouter;