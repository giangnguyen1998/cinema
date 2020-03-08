export default function (req, res, next) {
    //Get role account from request
    const role = req.user.role;

    //Check role account
    if (role === "guest") {
        return res.status(401).json({msg: "You're guest user, Authorization denied"});
    } else if (role === "admin") {
        next();
    }
};