const bcrypt = require('bcrypt');
const Centre = require('../Models/CentreModel');
const Booking = require('../Models/BookingModel');

module.exports.addCentre = async (req, res, next) => {
    try {
        const {cname, starttime, endtime} = req.body;
        const cnameCheck = await Centre.findOne({ cname });
        if (cnameCheck)
            return res.json({ msg: "Centre already available", status: false })
        const centre = await Centre.create({
            cname: cname,
            starttime: starttime,
            endtime: endtime,
          });
          return res.json({msg: "Centre Added!", status: true, centre });
        } 
    catch (ex) {
        next(ex);
        }
}

module.exports.getAllCentres = async (req, res, next) => {
        Centre.find({})
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: 'Error fetching data' }));
}

module.exports.removeCentre = async (req, res, next) => {
        const cname = req.body.cname;
        Centre.deleteOne({cname: cname}).then(result => { 
            if(result.deletedCount > 0){
                Booking.deleteMany({cname: cname}).then(result => {
                    console.log(`${result.deletedCount} documents deleted successfully.`);
                })
                return res.json({msg: "Record deleted", status: true});
            }
            else
            return res.json({msg: "Failed", status: false});
        }).catch(function(error)
        {
        return res.json({msg: {error}, status: false});
        });
}
