import { RequestHandler, Request, Response } from 'express';
import employeeServices from "../services/employeeServices"
import { json } from 'body-parser';
import Employee from '../models/employee.model';

export const getAllEmployee: RequestHandler = async(req: Request, res: Response) => {

  try {
    const employee = await employeeServices.getAllEmployee()    
    res.json(employee)
 
  } catch (error) {
    console.error(error);
  } 

};


export const createEmployee: RequestHandler = async(req: Request, res: Response) => {
  
  var updatedEmployee = null
  try {
    const id = Employee.length;
    updatedEmployee= await employeeServices.createEmployee(id, req.body) 
  } catch (error) {
    console.error(error);
  } 

  //check if the type of input is valid
  if((updatedEmployee.status === 200 )){
    res.status(200).json(updatedEmployee.user)
  }else if (updatedEmployee.status === 400 ){
    res.status(400).json({ "errorMessage": updatedEmployee.errorMessage});
  }else{

    res.status(400).json({ "errorMessage": "string" });
  }

};

export const getSingleEmployee: RequestHandler = async(req: Request, res: Response) => {

  try {
    const employee = await employeeServices.getSingleEmployee(req.params.id)
    res.status(200).json(employee);
 
  } catch (error) {
    console.error(error);
  } 

};


export const deleteEmployee: RequestHandler = async(req: Request, res: Response) => {
  const deletedEmployee = await employeeServices.deleteEmployee(req.params.id)

  if (!deletedEmployee) {
    res.status(404).json({ "errorMessage": "string" });
  }

  res.status(204).json(deletedEmployee);
};


export const getOrg: RequestHandler = async(req: Request, res: Response) => {
  const edited = await employeeServices.getOrg(req.params.id, req.body)


  // Change the data that is being returned
  switch(edited?.status) {
    case 400:
      res.status(400).json({ "errorMessage": edited.errorMessage });
      break;
    case 404:
      res.status(404).json({ "errorMessage": edited.errorMessage });
      break;
    default:
      res.status(200).json(edited?.errorMessage)
  }
};

