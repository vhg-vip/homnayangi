

const requireAuth = (req, res, next) => {
    // console.log(req.cookies);
    if(!req.cookies.userId){
        res.redirect('/user/login');
        return;
    }
    
    next();
}

module.exports = {
    requireAuth
}