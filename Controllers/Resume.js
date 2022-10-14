import express from "express";
import dotenv from "dotenv";
import { pool } from "../index.js";
dotenv.config();

export const Resume = async (req, res) => {
    const {userId,Img,FirstName,SecondName,Gender,Age,Profession,Location,PhoneNumber,Email,HouseAddress,ProfileDescription,GitHubProfileName,LinkedInProfileName,CollegeDegreeName,CollegeName,CollegeStartingDate,CollegeEndingDate,BachelorDegreeName,UniversityName,BachelorStartingDate,BachelorEndingDate,FirstExperience,FirststCompanyName,FirststExperienceStartingDate,FirststExperienceEndingDate,SecondExperience,SecondCompanyName,SecondExperienceStartingDate,SecondExperienceEndingDate,Skills} =req.body
    const query = "INSERT INTO resume (userId,Img,FirstName,SecondName,Gender,Age,Profession,Location,PhoneNumber,Email,HouseAddress,ProfileDescription,GitHubProfileName,LinkedInProfileName,CollegeDegreeName,CollegeName,CollegeStartingDate,CollegeEndingDate,BachelorDegreeName,UniversityName,BachelorStartingDate,BachelorEndingDate,FirstExperience,FirststCompanyName,FirststExperienceStartingDate,FirststExperienceEndingDate,SecondExperience,SecondCompanyName,SecondExperienceStartingDate,SecondExperienceEndingDate,Skills) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    pool.query(query, [userId,Img,FirstName,SecondName,Gender,Age,Profession,Location,PhoneNumber,Email,HouseAddress,ProfileDescription,GitHubProfileName,LinkedInProfileName,CollegeDegreeName,CollegeName,CollegeStartingDate,CollegeEndingDate,BachelorDegreeName,UniversityName,BachelorStartingDate,BachelorEndingDate,FirstExperience,FirststCompanyName,FirststExperienceStartingDate,FirststExperienceEndingDate,SecondExperience,SecondCompanyName,SecondExperienceStartingDate,SecondExperienceEndingDate,Skills], (err, row, field) => {
        if(err)
        {console.log(err)}
        if(row)
        {
            res.status(200).send({message:'resume added succesfully'})
        }
    })
}

export const getAllResume = async (req, res) => {
    const {userId} = req.params
    const query = "SELECT * FROM resume where userId=?";
    pool.query(query, [userId], (err, row, field) => {
        if(err)
        {console.log(err)}
        if(row)
        {
            if(row.length === 0)
            {res.send({data:[]})}
            else
            {
                res.send({data:row})
            }
        }
    })
}

export const deleteResume = async (req, res) => {
    const {id} = req.body
    const query = "DELETE FROM resume where id=?";
    pool.query(query, [id], (err, row, field) => {
        if(err)
        console.log(err)
        if(res)
        {
        res.status(200).send({message:'DELETED'})
        }
    })
}

export const getResume = async (req, res) => {
    const {resumeId} = req.params
    const query = "SELECT * FROM resume where id=?";
    pool.query(query, [resumeId], (err, row, field) => {
        if(err)
        {console.log(err)}
        if(row)
        {
                res.send({data:row})
        }
    })
}
