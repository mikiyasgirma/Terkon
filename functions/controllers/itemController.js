exports.createTour = async (req, res) => {

    const newItem = await item.create(req.body);

    res.status(201).json({
        status: 'success'
    });
};