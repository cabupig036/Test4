const router = require("express").Router();
const Order = require("../models/Order");


router.get("/", async(req, res) => {
    try {

        const order = await Order.find({});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GetOrderByGmail(gmail)
router.get("/:gmail/:orderId", async(req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;