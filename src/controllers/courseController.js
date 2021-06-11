const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const { denyAccess } = require('../middleware/permission')
const { createCourse } = require('../middleware/course')
const prisma = new PrismaClient;
exports.create = async (req, res) => {
    //   let access=await (req.user.userType == 'instructor'?createCourse(req,res):denyAccess())
    const { courseName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {
        const course = await prisma.course.create({
            data: {
                courseName: courseName,
                creatorUserId: req.user.userId
            },
        }).then(course => returnData.courseId = course.courseId).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });
    }
    else
        returnData = denyAccess()
    res.json(returnData);
};
exports.edit = async (req, res) => {
    const { courseId, courseName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const course = await prisma.course.update({
            where: {
                courseId: courseId,
                status: true,
            },
            update: {
                courseName: courseName,
            }
        }).then(course => { returnData.courseId = course.courseId; returnData.status = 'success' }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });

    }
    else
        returnData = denyAccess()
    res.json(returnData);

};
exports.delete = async (req, res) => {
    const { courseId, courseName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const course = await prisma.course.update({
            where: {
                courseId: courseId,
                status: true,
            },
            update: {
                status: false,
            }
        }).then(course => { returnData.courseId = course.courseId; returnData.status = 'success' }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });

    }
    else
        returnData = denyAccess()
    res.json(returnData);


};
exports.getAllCourses = async (req, res) => {
    const { courseId, courseName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const course = await prisma.course.findMany({
            where: {
                status: true
            }
        }).then((course) => returnData = res).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });
    }
    else
        returnData = denyAccess()
    res.json(returnData);


};
exports.getCourseByPageNumber = async (req, res) => {
    const { pageNumber, totalCount } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {
        const course = await prisma.course.findMany({
            where: {
                status: true
            },
            skip: pageNumber * totalCount,
            take: totalCount
        }).then((course) => returnData = res).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });
    }
    else
        returnData = denyAccess()
    res.json(returnData);
};
