const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
exports.createCourse = async (req, res) => {
    let returnData={};
    const { courseName } = req.body;
    console.log(req.user.userId);
    const course = await prisma.course.create({
        data: {
            courseName: courseName,
            creatorUserId: req.user.userId
        },
    }).then(course => res.courseId=course.courseId).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        })
    }).finally(async () => { await prisma.$disconnect() });
returnData.courseId=course.courseId;
res.json(returnData);
}