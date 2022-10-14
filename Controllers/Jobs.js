import express from "express";
import dotenv from "dotenv";
import { pool } from "../index.js";
dotenv.config();
// import { tokenList } from './AuthenticateToken.js';

export const Jobs = async (req, res) => {
    const {companyId,title,vaccancies,description,jobType,minExperience,createdTime,skills} =req.body
    const query = "INSERT INTO jobs (companyId,title,vaccancies,decription,jobType,minExperience,createdTime) VALUES (?,?,?,?,?,?,?)";
    pool.query(query, [companyId,title,vaccancies,description,jobType,minExperience,createdTime], (err, row, field) => {
        if(err)
        {console.log(err)}
        if(row)
        {
            skills.forEach((value,index) => {
                pool.query("INSERT INTO companyskills (jobId,skill) VALUES (?,?)", [row.insertId,value], (err, row, field) => {
                    if(err)
                    console.log(err)
                    if(res)
                    {
                        if(index+1 === skills.length)
                        { res.status(200).send({
                            message: "Job published successfully",
                          });}
                    }
                })
            });
        }
    })
}

export const getAllJobs = async (req, res) => {
    const {companyId} = req.params
    const query = "SELECT * FROM jobs where companyId=?";
    pool.query(query, [companyId], (err, row, field) => {
        if(err)
        {console.log(err)}
        if(row)
        {
            if(row.length === 0)
            {res.send({data:[]})
            console.log('data sent')
        }
            else
            {
            row.forEach((value,index) =>
            {
                pool.query("SELECT * FROM companyskills where jobId=?", [value.id], (error, rows, fields) => {
                    if(error)
                    {console.log(err)}
                    if(rows)
                    {
                        row[index].skill = rows
                        if(row.length === index+1)
                        {
                            row.reverse()
                            res.send({data:row})
                        }
                    }
                })
            })
            }
        }
    })
}

export const deleteJob = async (req, res) => {
    const {id} = req.body
    const query = "DELETE FROM jobs where id=?";
    pool.query(query, [id], (err, row, field) => {
        if(err)
        console.log(err)
        if(res)
        {
        res.status(200).send({message:'DELETED'})
        }
    })
}

export const getAllJobsForEmployee = async (req, res) => {
    const {userId} = req.params
    console.log(userId)
    const query = "SELECT jobs.id,jobs.companyId,jobs.title,jobs.vaccancies,jobs.decription,jobs.jobType,jobs.minExperience,jobs.createdTime,user.name,user.img,user.description,user.location FROM jobs INNER JOIN user ON jobs.companyId = user.id; ";
    pool.query(query,(err, row, field) => {
        if(err)
        console.log(err)
        if(row)
        {
        row.reverse()
        row.forEach((item,index) =>
        {
            pool.query('SELECT * from companyskills where jobId =?',[item.id],(errr, rows, field) => {
                if(errr)
                console.log(errr)
                if(rows)
                {  
                    let newArr = []
                    rows.forEach((value,ins) =>
                    {
                        newArr.push(value.skill.toLowerCase())
                        if(rows.length === ins+1)
                        {
                            row[index].skills = newArr
                        }
                    })
                    if(row.length === index+1)
                    {
                        row.reverse()
                        res.send({data:row})
                    }
                }
            })
        })
        }
    })
}

export const getSingleJob = async (req, res) => {
    const {jobId} = req.params
    const query = "SELECT * FROM jobs where id=?";
    pool.query(query, [jobId], (err, row, field) => {
        if(err)
        {console.log(err)}
        if(row)
        {
            if(row.length === 0)
            {res.send({data:[]})
            console.log('data sent')
            }
            else
            {
                pool.query("SELECT * FROM companyskills where jobId=?", [jobId], (error, rows, fields) => {
                    if(error)
                    {console.log(err)}
                    if(rows)
                    {
                        let Skills = rows.map((item,index) =>
                        {
                            return item.skill
                        })
                        row[0].skill = Skills
                        res.send({data:row})
                    }
                })
            }
        }
    })
}
