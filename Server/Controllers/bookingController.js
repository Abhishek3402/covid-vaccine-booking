const Centre = require('../Models/CentreModel');
const Booking = require('../Models/BookingModel');

module.exports.Centres = async (req, res, next) => {
    try {
        const {fdate, cname, email} = req.body;
        const count = await Booking.count({cname: cname, date: fdate});
        if (count > 9){
            return res.json({msg: `All slots booked for ${fdate} (Max 10 slots)`, status: false});
        }
        else {
            const booking = await Booking.create({
                date: fdate,
                cname: cname,
                email: email,
            }
            );
            return res.json({msg: "Booking Created!", status: true, booking });
        }
        } 
    catch (ex) {
        next(ex);
    }
}

module.exports.Dosage = async (req, res, next) => {
    const aggr_result = Booking.aggregate([
        { $group: { _id: "$cname", dosage: { $count: {} } } }
      ])
      const result = await aggr_result.exec();
      return res.json(result);
}