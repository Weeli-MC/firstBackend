// import { Model } from "sequelize"
import { Model, AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table, DataType } from "sequelize-typescript"
import { Col } from "sequelize/types/utils"

export interface EmployeeI{
    id? : number | null
    name: string
    salary: number
    department: string
}


export enum Department {
    HR = 'HR',
    PS = 'PS',
    AC = 'AC',
    IT = 'IT'
  }

@Table(
    {
        tableName: "employee",
        timestamps: true
    }
)

export default class Employee extends Model implements EmployeeI{
  
    @AutoIncrement
    @PrimaryKey
    @Column
    id? : number;

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string
    
    @AllowNull(false)
    @NotEmpty
    @Column
    salary!: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.ENUM('HR', 'IT', 'AC', 'PS')
    })
    department!: Department;


}