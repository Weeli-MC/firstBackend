import { Router } from 'express';

import {  getAllEmployee, 
    getSingleEmployee, 
    createEmployee, 
    getOrg, 
    deleteEmployee
} from '../controllers/employees';

const router = Router();

router.get('/', getAllEmployee);

router.post('/', createEmployee);


router.get('/:id', getSingleEmployee); 

router.put('/:id', getOrg);

router.delete('/:id', deleteEmployee);

export default router;