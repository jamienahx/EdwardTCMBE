const servicedao = require("../schema/service"); 


  async function getAllServices(){
    return await servicedao.find();
  }


  async function createService(data){

    const service = new servicedao(data);
    return await service.save();
  }

  async function updateService(data, id) {
    //case sensitive, NOT findByIDAndUpdate
    const updated = await servicedao.findByIdAndUpdate(id, data, {new: true});
    return updated;

  }

  async function deleteService(id) {
    const deleted = await servicedao.findByIdAndDelete(id);
    return deleted;

  }


  module.exports = {

    getAllServices,
    createService,
    updateService,
    deleteService
  }