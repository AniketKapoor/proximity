const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const { denyAccess } = require('../middleware/permission')
const { createSubject } = require('../middleware/subject')
const prisma = new PrismaClient;
exports.create = async (req, res) => {
    //   let access=await (req.user.userType == 'instructor'?createSubject(req,res):denyAccess())
    const { subjectName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {
        const subject = await prisma.subject.create({
            data: {
                subjectName: subjectName,
                creatorUserId: req.user.userId
            },
        }).then(subject => returnData.subjectId = subject.subjectId).catch(err => {
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
    const { subjectId, subjectName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const subject = await prisma.subject.update({
            where: {
                subjectId: subjectId,
                status: true,
            },
            update: {
                subjectName: subjectName,
            }
        }).then(subject => { returnData.subjectId = subject.subjectId; returnData.status = 'success' }).catch(err => {
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
    const { subjectId, subjectName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const subject = await prisma.subject.update({
            where: {
                subjectId: subjectId,
                status: true,
            },
            update: {
                status: false,
            }
        }).then(subject => { returnData.subjectId = subject.subjectId; returnData.status = 'success' }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });

    }
    else
        returnData = denyAccess()
    res.json(returnData);


};
exports.getAllSubjects = async (req, res) => {
    const { subjectId, subjectName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const subject = await prisma.subject.findMany({
            where: {
                status: true
            }
        }).then((subject) => returnData = res).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });
    }
    else
        returnData = denyAccess()
    res.json(returnData);


};
exports.getSubjectByPageNumber = async (req, res) => {
    const { pageNumber, totalCount } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {
        const subject = await prisma.subject.findMany({
            where: {
                status: true
            },
            skip: pageNumber * totalCount,
            take: totalCount
        }).then((subject) => returnData = res).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });
    }
    else
        returnData = denyAccess()
    res.json(returnData);
};
