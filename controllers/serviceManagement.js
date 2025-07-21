const serviceModel = require('../models/serviceManagement');

module.exports = {
getAllServices,
createService,
updateService,
deleteService
}; 

async function getAllServices (req,res) {

    try{

        //calls model's getAllServices
        const services = await serviceModel.getAllServices(); 
        //return back all the services if successful
        //dont need the 200 because the response will automatically send 200 already
     res.json(services);

    } catch(err){

    //in case of error, send back status 500 (server error) and the corresponding error message
        res.status(500).json({message: err.message});

    }

}

async function createService (req,res) {

    try{
        //get the request body and passes it into the createService function
        const newService = await serviceModel.createService(req.body);
        //return back the newly created service
        //post requests needs the status code to be explicitly set. 
        res.status(201).json(newService);

    } catch(err){

    //in case of error, send back 400 bad request and the corresponding error message. 400 means the data sent is problematic
        res.status(400).json({message: err.message});
    }

}



async function updateService (req,res) {

    try{
//updates the *particular* service hence need to use params id.
        const updatedService = await serviceModel.updateService(req.body, req.params.id);

        //error handling if service not founnd. return a bad request. 404 means the data doesnt exist.

        if (!updatedService) {
            return res.status(404).json({message: 'Service not found'});
        }
        res.json(updatedService);

    } catch(err){

    //error handling for when problematic data is sent
        res.status(400).json({message: err.message});
    }

}



async function deleteService (req,res) {

    try{

        const deletedService = await serviceModel.deleteService(req.params.id);

      

        if (!deletedService) {
            return res.status(404).json({message: 'Service not found'});
        }
        res.json({message: "service deleted successfully"});

    } catch(err){
        res.status(500).json({message: err.message});
    }

}