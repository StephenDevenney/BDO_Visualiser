var express = require('express');
var router = express.Router();
var securityPath = require('../middleware/securityHandler');

// // GET

// Get All Users
router.get('/users', (req, res) => { return securityPath.getAllUsers(res) });

// Get User
router.get('/users/:id', (req, res) => { return securityPath.getUser(req.params.id, res) });

// Get Config-Settings
router.get('/config-settings', (req, res) => { return securityPath.getConfigSettings(res) });

// Get Nav-Menu
router.get('/nav-menu', (req, res) => { return securityPath.getNavMenu(res) });

// Get Themes
router.get('/themes', (req, res) => { return securityPath.getThemes(res) });

// // POST

// Create User
router.post('/users', (req, res) => { return res.json(securityPath.createUser(req.body, res)) });

// // PUT
router.put('/config-settings', (req, res) => { return res.json(securityPath.updateSettings(req.body, res)) });

// Update User
// router.put('/:id', (req, res) => {
//   var id = parseInt(req.params.id);
//   var userFound = users.some(user => user.id === id);
//   if(userFound){
//     var newUser = req.body;
//     users.forEach(user => {
//       if(user.id === id){
//         user.userName = newUser.userName ? newUser.name : user.name;
//         user.emailAddress = newUser.emailAddress ? newUser.emailAddress : user.emailAddress;
//         user.roleId = newUser.roleId ? newUser.roleId : user.roleId;

//         res.json({ msg: "User updated", user});
//       }  
//     });
//   } 
//   else
//     res.status(400).json({ msg: `User not found with id of ${id}.`})
// });

// // Delete Single
// router.delete('/:id', (req, res) => {
//   var id = parseInt(req.params.id);
//   var userFound = users.some(user => user.id === id);
//   if(userFound)
//     res.json({ 
//     msg: "User deleted", 
//     users: users.filter(user => user.id !== id)
//   });
//   else
//     res.status(400).json({ msg: `User not found with id of ${id}.`})
// });

module.exports = router;
