const { PrismaClient } = require('@prisma/client');
const { json } = require('express');
const { denyAccess } = require('../middleware/permission')
const { createtag } = require('../middleware/tag')
const prisma = new PrismaClient;
exports.create = async (req, res) => {
    //   let access=await (req.user.userType == 'instructor'?createtag(req,res):denyAccess())
    const { tagName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {
        const tag = await prisma.tag.create({
            data: {
                tagName: tagName,
                creatorUserId: req.user.userId
            },
        }).then(tag => returnData.tagId = tag.tagId).catch(err => {
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
    const { tagId, tagName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const tag = await prisma.tag.update({
            where: {
                tagId: tagId,
                status: true,
            },
            update: {
                tagName: tagName,
            }
        }).then(tag => { returnData.tagId = tag.tagId; returnData.status = 'success' }).catch(err => {
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
    const { tagId, tagName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const tag = await prisma.tag.update({
            where: {
                tagId: tagId,
                status: true,
            },
            update: {
                status: false,
            }
        }).then(tag => { returnData.tagId = tag.tagId; returnData.status = 'success' }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });

    }
    else
        returnData = denyAccess()
    res.json(returnData);


};
exports.getAlltags = async (req, res) => {
    const { tagId, tagName } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {

        const tag = await prisma.tag.findMany({
            where: {
                status: true
            }
        }).then((tag) => returnData = res).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });
    }
    else
        returnData = denyAccess()
    res.json(returnData);


};
exports.gettagByPageNumber = async (req, res) => {
    const { pageNumber, totalCount } = req.body;
    let returnData = {}
    if (req.user.userType == 'instructor') {
        const tag = await prisma.tag.findMany({
            where: {
                status: true
            },
            skip: pageNumber * totalCount,
            take: totalCount
        }).then((tag) => returnData = res).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        }).finally(async () => { await prisma.$disconnect() });
    }
    else
        returnData = denyAccess()
    res.json(returnData);
};
