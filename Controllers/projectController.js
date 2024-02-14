const projects = require('../Models/projectSchema');

// add the project logic

exports.addUserProject = async (req, res) => {
    console.log("inside addUserProject");

    // res.status(200).json('add user project request')
    // user id get
    const userId = req.payload;
    // add project details
    const { title, language, github, link, overview } = req.body;
    // get the image
    const projectimage = req.file.filename;
    console.log(projectimage);

    // logic of adding new user project
    try {
        const existingProject = await projects.findOne({ github });
        if (existingProject) {
            res.status(406).json("Project already exists");
        } else {
            // Declare newProject outside the else block
            const newProject = new projects({ title, language, github, link, overview, projectimage, userId });
            await newProject.save(); // save new project details into MongoDB
            res.status(200).json(newProject); // send response to the client
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
//get user projects

exports.getUserProject = async (req, res) => {
    //get user id
    const userId = req.payload
    //api request
    try {
        //get project information of particular user
        const userProject = await projects.find({ userId })
        console.log(userProject);
        res.status(200).json(userProject) //semd response to the client
    }
    catch (error) {
        res.status(401).json(error.message)
    }
}

//get all projects



exports.getAllProjects = async (req, res) => {
const searchKey = req.query.search
const query={
    language:{
        $regex:searchKey,
        $options:"i"
    }
}

    try {
        const AllProjects = await projects.find(query)
        res.status(200).json(AllProjects) //send response to the client
    }
    catch (error) {
        res.status(401).json(error.message)
    }
}

//get home project
exports.getHomeProject = async (req, res) => {
    try {
        const HomeProjects = await projects.find().limit(3)
        res.status(200).json(HomeProjects) //send response to the client
    }
    catch (error) {
        res.status(401).json(error.message)
    }
}


//edit project details
exports.editProject = async (req, res) => {
    const { title, language, github, link, overview, projectimage } = req.body;

    const uploadImage = req.file ? req.file.filename : projectimage;
    const userId = req.payload
    const { id } = req.params

    try {
        //find the particular project id in mongodb and add the updated project details
        const updateProject = await projects.findByIdAndUpdate({ _id: id }, { title, language, github, link, overview, projectimage: uploadImage, userId }, { new: true })
        //save the updated project details
        await updateProject.save()
        //response send back to the client
        res.status(200).json(updateProject)

    }
    catch (error) {
        res.status(401).json(error)
    }

}

//delete the project details
exports.deleteProject = async (req, res) => {
    const { pid } = req.params

    try {
        const deleteData = await projects.findByIdAndDelete({ _id: pid })
        res.status(200).json(deleteData)
    }
    catch (error) {
        res.status(401).json(error)
    }
}




