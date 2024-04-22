//import model
const projects = require('../Models/projectModel')

//addproject
exports.addProject = async (req,res)=>{
    console.log("Inside add Project request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    //destructuring text contents from reqbody
    const {title,language,overview,github,website} = req.body
    const userId = req.payload
    const projectImage = req.file.filename

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
        //existing project
        res.status(406).json("Project already available in our system, Kindly upload another!!!")
        }else{
            //new project
            //create an object for model
            const newProject = new projects({
                title,language,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    } 
}


//get all projects
exports.getAllProjects = async (req,res)=>{
    //getting query parameter
    const searchKey = req.query.search
    const query = {
        language : {
            //searchKey need to be searched ; i indicates case-sensitive
            $regex: searchKey, $options: 'i'
        }
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


//get userprojects
exports.getUserProjects = async (req,res)=>{
    //to get userId
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


//get homeprojects
exports.getHomeProjects = async (req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


//edit projects
exports.editProjects = async(req,res) =>{
    console.log("Inside Edit project");
    const {pid} = req.params
    const {userId} = req.payload
    const {title,language,overview,github,website,projectImage} = req.body
    const uploadImage = req.file ? req.file.filename : projectImage
    try{
        //updation in mongoose
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
            //always give in order of schema
            title,language,overview,github,website,projectImage:uploadImage,userId
        },{new:true})
        //to save in mongoDb
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }

}


//deletion ; 1st argument should be request
exports.removeProject = async(req,res) =>{
    console.log("Inside remove project");
    //get _id from url
    const {pid} = req.params
    try{
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}