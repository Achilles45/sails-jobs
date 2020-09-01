module.exports = async function(req, res, proceed){
    try {
        //First find the listings exists
        const listing = await Listing.findOne({id: req.params.id})
        if(!listing){
            res.status(404).json({message: "No listing was found to match this ID"})
        }if(req.me.id == listing.lister){
            proceed()
        }else{
            res.status(401)
            .json({message: "Only listing owner can perform this action"})
        }
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}