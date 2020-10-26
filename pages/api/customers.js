import User from '../../models/User';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    try {
        const customers = await User.find().sort({createdAt: 'desc'});
        res.status(200).json({customers});
    } catch (error) {
        // console.error(error)
        res.status(403).send("Please login");
    }
}