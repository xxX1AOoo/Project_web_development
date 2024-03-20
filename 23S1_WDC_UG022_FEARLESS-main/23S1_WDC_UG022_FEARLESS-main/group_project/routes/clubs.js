var express = require('express');
var router = express.Router();
const db = require('../db/index');
//Obtain club list based on conditions
router.get("/clubsQuery",(req,res)=>{
  let data= req.query;
  let sql = `SELECT club_id AS clubId,club_name as clubName,email,poster, intro FROM Clubs where 1=1`;

  if(data.clubId){
      sql += ` AND club_id LIKE '%${data.clubId}%'`;
  }
  if(data.clubName){
      sql += ` AND club_name LIKE '%${data.clubName}%'`;
  }
  if(data.intro){
      sql += ` AND intro LIKE '%${data.intro}%'`;
  }
  if(data.email){
      sql += ` AND email LIKE '%${data.email}%'`;
  }
  sql += ` LIMIT ${(data.pageIndex - 1) * data.pageSize}, ${data.pageSize}`;
  console.log(sql);
  try {
      db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
          status: 1,
          data: results,
          code: 200
        });
      });
    } catch {
      res.send({
        code: 500,
        data: "request failure!",
        status: 0
      });
    }
});

//Obtain the total number of clubs
router.get("/clubsCount",(req,res)=>{
  let data= req.query;
  let sql = `SELECT count(*) as count FROM Clubs where 1=1`;

  if(data.clubId){
      sql += ` AND club_id LIKE '%${data.clubId}%'`;
  }
  if(data.clubName){
      sql += ` AND club_name LIKE '%${data.clubName}%'`;
  }
  if(data.intro){
      sql += ` AND intro LIKE '%${data.intro}%'`;
  }
  if(data.email){
      sql += ` AND email LIKE '%${data.email}%'`;
  }


  try {
      db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
          status: 1,
          total: results[0].count,
          code: 200
        });
      });
    } catch {
      res.send({
        code: 500,
        data: "request failure!",
        status: 0
      });
    }
});


//Add Club

router.post("/clubsInsert", (req, res) => {

  const data = req.body
  // 校验必填字段
  Object.keys(data).forEach(key => {

    if (!data[key]) {
      // console.error(`${key} is required.`);
      return res.cc(`${key} is required.`);

    }
  });

  let sql =`
  INSERT INTO Clubs (club_name, email, poster, intro)

  VALUES ('${data.clubName}', '${data.email}','${data.poster}','${data.intro}')
  `;
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    try {
      res.send({
        status: 1,
        data: "Added successfully !",
        code: 200
      })
    } catch {
      res.cc("Add failed !",);
    }
  });
});

//更新
router.post("/ClubsUpdate",(req, res) => {
  const data= req.body
  // 校验必填字段
  Object.keys(data).forEach(key => {

    if (!data[key]) {
      // console.error(`${key} is required.`);
      res.cc(`${key} is required.`);
      return;
    }
  });
  let sql = `
  UPDATE Clubs
    SET club_name = '${data.clubName}',
    email = '${data.email}',
    poster = '${data.poster}',
    intro = '${data.intro}'
    WHERE club_id = '${data.clubId}'`

    db.query(sql,(err,results)=>{
      if (err) return err;
      try {
        res.send({
          status: 1,
          data: "Successfully modified !",
          code: 200
        })
      } catch {
        res.cc("Modification failed !",);
      }
    });
});


router.get("/clubsDelete",(req, res) => {
  const {clubId}= req.query
  let sql = `DELETE Clubs
  FROM Clubs
  WHERE club_id = ${clubId};`;

  db.query(sql,(err,results)=>{
    if (err) return err;
    try {
      res.send({
        status: 1,
        data: "Successfully deleted !",
        code: 200
      });
    } catch {
      res.cc("Delete failed !",);
    }
  });
});


//Obtain the number of Users
router.get("/userCount", (req, res) => {
  let data = req.query
  let sql = `SELECT COUNT(*) AS total
  FROM Users u
  LEFT JOIN Members m ON m.user_id = u.user_id
  LEFT JOIN Clubs c ON m.club_id = c.club_id
  WHERE `;
  if (!data.clubId) {
    sql += `c.club_id IS NULL OR c.club_id IS NOT NULL`
  } else {

    sql += ` 1=1 `
  }
  if (data.userId) {
    sql += ` AND u.user_id LIKE '%${data.userId}%'`;
  }
  if (data.username) {
    sql += ` AND u.username LIKE '%${data.username}%'`;
  }
  if (data.firstName) {
    sql += ` AND u.first_name LIKE '%${data.firstName}%'`;
  }
  if (data.lastName) {
    sql += ` AND u.last_name LIKE '%${data.lastName}%'`;
  }
  if (data.email) {
    sql += ` AND u.email LIKE '%${data.email}%'`;
  }
  if (data.clubName) {
    sql += ` AND c.club_name LIKE '%${data.clubName}%'`;
  }
  if (data.clubId) {
    sql += ` AND c.club_id LIKE '%${data.clubId}%'`;
  }
  if (data.poster) {
    sql += ` AND c.poster LIKE '%${data.poster}%'`;
  }
  try {

    db.query(sql, (err, results) => {
      if (err) return res.cc(err)
      console.log(results)
      res.send({
        status: 1,
        total: results[0].total,
        code: 200,
      })
    })
  } catch {
    res.send({
      code: 500,
      data: "request failure!",
      status: 0,
    })
  }
 })



//Obtain user information based on conditions
router.get("/userQuery", (req, res) => {

  let data = req.query

  let sql = `SELECT u.user_id AS userId,u.username AS username,u.pass,u.first_name AS firstName,u.last_name AS lastName,u.avatar AS avatar,u.email AS email,c.club_name AS clubName,c.club_id AS clubId, c.poster AS poster,u.is_admin AS isAdmin
  FROM Users u
  LEFT JOIN Members m ON m.user_id = u.user_id
  LEFT JOIN Clubs c ON m.club_id = c.club_id
  WHERE `;
  if (!data.clubId) {
    sql += `c.club_id IS NULL OR c.club_id IS NOT NULL`
  } else {

    sql += ` 1=1 `
  }
  if (data.userId) {
    sql += ` AND u.user_id LIKE '%${data.userId}%'`;
  }
  if (data.username) {
    sql += ` AND u.username LIKE '%${data.username}%'`;
  }
  if (data.firstName) {
    sql += ` AND u.first_name LIKE '%${data.firstName}%'`;
  }
  if (data.lastName) {
    sql += ` AND u.last_name LIKE '%${data.lastName}%'`;
  }
  if (data.email) {
    sql += ` AND u.email LIKE '%${data.email}%'`;
  }
  if (data.clubName) {
    sql += ` AND c.club_name LIKE '%${data.clubName}%'`;
  }
  if (data.clubId) {
    sql += ` AND c.club_id LIKE '%${data.clubId}%'`;
  }
  if (data.poster) {
    sql += ` AND c.poster LIKE '%${data.poster}%'`;
  }
  console.log(sql)
  sql += ` LIMIT ${(data.pageIndex - 1) * data.pageSize}, ${data.pageSize}`;

  try {
    db.query(sql, (err, results) => {
      if (err) return res.cc(err)

      res.send({
        status: 1,
        data: results,
        code: 200,
      })
    })

  } catch {
    res.send({
      code: 500,
      data: "request failure!",
      status: 0,
    })
  }
 })

 //Obtain the number of Users
 router.get("/userCount", (req, res) => {
  let data = req.query
  let sql = `SELECT COUNT(*) AS total
  FROM Users u
  LEFT JOIN Members m ON m.user_id = u.user_id
  LEFT JOIN Clubs c ON m.club_id = c.club_id
  WHERE `;
  if (!data.clubId) {
    sql += `c.club_id IS NULL OR c.club_id IS NOT NULL`
  } else {

    sql += ` 1=1 `
  }
  if (data.userId) {
    sql += ` AND u.user_id LIKE '%${data.userId}%'`;
  }
  if (data.username) {
    sql += ` AND u.username LIKE '%${data.username}%'`;
  }
  if (data.firstName) {
    sql += ` AND u.first_name LIKE '%${data.firstName}%'`;
  }
  if (data.lastName) {
    sql += ` AND u.last_name LIKE '%${data.lastName}%'`;
  }
  if (data.email) {
    sql += ` AND u.email LIKE '%${data.email}%'`;
  }
  if (data.clubName) {
    sql += ` AND c.club_name LIKE '%${data.clubName}%'`;
  }
  if (data.clubId) {
    sql += ` AND c.club_id LIKE '%${data.clubId}%'`;
  }
  if (data.poster) {
    sql += ` AND c.poster LIKE '%${data.poster}%'`;
  }
  try {

    db.query(sql, (err, results) => {
      if (err) return res.cc(err)
      console.log(results)
      res.send({
        status: 1,
        total: results[0].total,
        code: 200,
      })
    })
  } catch {
    res.send({
      code: 500,
      data: "request failure!",
      status: 0,
    })
  }
 })

 router.post("/userInsert", (req, res) => {

  const data = req.body

  // Verify required fields
 Object.keys(data).forEach(key => {
  console.log(key,"123")
  if (!data[key]&&key!="avatar") {
    // console.error(`${key} is required.`);
    res.cc(`${key} is required.`)
    return;
  }
 });
  if (!data.avatar||data.avatar&&data.avatar.indexOf("/admin_profile.html")!=-1) {
    data.avatar = 'images/about02.jpg';
  }
 let sql =`
 INSERT INTO Users (username, pass, first_name, last_name, avatar, email, is_admin)

 VALUES ('${data.username}', '${data.pass}','${data.firstName}','${data.lastName}','${data.avatar}','${data.email}','${data.isAdmin}')
 `

 console.log(sql)
  db.query(sql, (err, results) => {
    if (err) return err;
    try {
      res.send({
        status: 1,
        data: "Added successfully !",
        code: 200
      })
    } catch {
      res.cc("AAdd failed !",)
    }
  });
 })

 // update userInfo
 router.post("/userUpdate",(req, res) => {
  const data= req.body
 // Verify required fields
 Object.keys(data).forEach(key => {
  console.log(key,"123")
  if (!data[key]&&key!="avatar") {
    // console.error(`${key} is required.`);
    res.cc(`${key} is required.`)
    return;
  }
 });
  let sql = `
  UPDATE Users
    SET pass = '${data.pass}',
    first_name = '${data.firstName}',
    last_name = '${data.lastName}',
    avatar = '${data.avatar}',
    email = '${data.email}',
    is_admin = '${data.isAdmin}'
    WHERE user_id = '${data.userId}'`

    db.query(sql,(err,results)=>{
      if (err) return err;
      try {
        res.send({
          status: 1,
          data: "Successfully modified !",
          code: 200
        })
      } catch {
        res.cc("Modification failed !",)
      }
    })
 })

 //delete userInfo
 router.get("/userDelete",(req, res) => {
  const {userId}= req.query
  let sql = `DELETE Users, Members
  FROM Users
  LEFT JOIN Members ON Users.user_id = Members.user_id
  WHERE Users.user_id = ${userId};`

  db.query(sql,(err,results)=>{
    if (err) return err;
    try {
      res.send({
        status: 1,
        data: "Successfully deleted !",
        code: 200
      })
    } catch {
      res.cc("Delete failed !",)
    }
  })
 })



module.exports = router;