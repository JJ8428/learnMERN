// this makes it where the link requires a ?user=john for it to hit next
// Otherwise, it returns a 401 with Unauthorized

const authorize = (req, res, next) => {
    const { user } = req.query
    if (user == 'jj') {
        req.user = {name: 'jj', id: 3}
        next()
    }
    else {
        res.status(401).send('Unauthorized')
    }
}

module.exports = authorize