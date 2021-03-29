const express = require("express")
let routes = express.Router()
let TodoModel = require("../Model/Todo")

 routes.get("/getTodo", (req, res) => {
    
    console.log("get todo")  
    TodoModel.find({},function(err, result) {
        if (err) throw err;        
        res.render("Todo",{todos : result})           
    })
       
 })

 routes.post("/add", async (req, res) => {
    console.log("Add todo")
    let todo = new TodoModel({ title: req.body.title, status: false})
    await todo.save()
    
    res.redirect('/Todo/getTodo')
 })

 routes.delete("/delete/:id",(req, res) => {
    console.log("delete")
    
    let id = req.params.id
    
    TodoModel.deleteOne({_id : id}, (err, result) => {
        if (err) 
            res.status(400).json({err : err, isSuccess : false});
        else    
            res.status(200).json({err : err, isSuccess : true});  
    })
 })

 routes.patch("/update/:id",(req, res) => {
    console.log("update Todo")
    
    let id = req.params.id
    
    TodoModel.updateOne({_id : id}, {$set : { status : req.body.status}},(err, result) => {
        if (err) 
            res.status(400).json({err : err, isSuccess : false});
        else    
            res.status(200).json({err : err, isSuccess : true});  
    })
    
})

 module.exports.routes = routes