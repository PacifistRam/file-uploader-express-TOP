const checkLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    next();
}

const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        // User is authenticated, proceed to next middleware
        return next();
    }
    // user is not authenticated 
    res.redirect('/log-in')
}


module.exports = {
    checkLoggedIn,
    ensureAuthenticated
}