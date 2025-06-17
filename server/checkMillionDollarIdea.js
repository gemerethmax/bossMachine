const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const weeks = parseInt(numWeeks);
    const revenue = parseInt(weeklyRevenue);
    if (typeof weeks !== 'number' || typeof revenue !== 'number') {
        return res.status(400).send({ message: 'Invalid input: numWeeks and weeklyRevenue must be numbers.' });
    } else {
        const value = weeks * revenue;
        if (value >= 1000000) {
            return next();
        } else {
            return res.status(400).send({ message: 'Idea must be worth at least a million dollars.' });
        }
    }
};



// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
