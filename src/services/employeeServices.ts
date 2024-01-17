import { RequestHandler } from 'express';
import { NextFunction, Request, Response } from "express";
import Employee from '../models/employee.model';
import Joi, { valid } from 'joi';

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    salary: Joi
        .number()
        .integer()
        .strict()
        .min(100)
        .max(10000000),


    department: Joi.string()
            .valid('HR', 'IT', 'AC', 'PS')
})




const getAllEmployee = () => {
    const employees = Employee.findAll()
    return (employees)
};


export const getSingleEmployee = async (params: string) => {
    const newId: number = parseInt(params);
    const index = await Employee.findOne({
        where: {
            id: newId
        }
    })
    return index
};


const createEmployee = async(id: number, body: Employee) => {
    const { name, salary, department } = body
    const user = Employee.create({ name, salary, department })

    
    let errorMessage =  schema.validate({ name, salary, department });
    // console.log("ERROR", Object.keys(errorMessage).length);
    
    if(Object.keys(errorMessage).length !== 1){
        return { status: 400, errorMessage: errorMessage.error.message.replace(/"\"/g,'') };
    }
    else {
        //return updated item
        return  { status: 200, user: await user }
    }
};


const getOrg = async (params: string, body: Employee) => {
    const newId: number = parseInt(params);
    const { name, salary, department } = body

    //find the employee
    const singleEmployee = await Employee.findOne({
        where: {
            id: newId
        }
    })

    //update the employee
    const updatedEmployee = await singleEmployee?.update({
        name: name,
        salary: salary,
        department: department
    })
    
    //check if the input is valid
    let errorMessage =  schema.validate({ name, salary, department });
    
        //check if the type of input is valid or if bad request
        //if not found
        if (!singleEmployee) {
            //if index is not found, throw Error 404
            return { status: 404, errorMessage: "Not found" };
        }
    

        //if input is invalid or valid:
    if(Object.keys(errorMessage).length !== 1){
        return { status: 400, errorMessage: errorMessage.error.message.replace(/"\"/g,'') };
    }
    else {
        //return updated item
        return  { status: 200, errorMessage: updatedEmployee }
    }    
    
};


export const deleteEmployee = async (params: string) => {
    const newId: number = parseInt(params);
    const employee = await Employee.findOne({
        where: {
            id: newId
        }
    })
    console.log("delete", employee === null)
    if ((employee === null) !== true) {
        const deletedItem = await Employee.destroy(
            {
                where: {
                    id: newId
                }
            }
        )
        return deletedItem;
    }
    else console.log("this")
};


export default {
    getAllEmployee,
    createEmployee,
    getSingleEmployee,
    getOrg,
    deleteEmployee
}
