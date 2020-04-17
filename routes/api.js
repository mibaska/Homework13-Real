const router = require("express").Router();
const Transaction = require("../models/transaction.js");

router.put("/api/transaction", ({ body }, res) => {
  Transaction.create(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// router.put("/api/transaction/bulk", (req, res) => {
//   Transaction.updateMany(
//     { _id: req.params.id },
//     { name: req.params.name },
//     { value: req.params.value }
//     )
//   .then(dbTransaction => {
//     res.json(dbTransaction);
//   })
//   .catch(err => {
//     res.status(400).json(err);
//   });
// });

router.put("/api/transaction/bulk", ({ body }, res) => {
  Transaction.insertMany(body)
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  Transaction.find({})
    .sort({ date: -1 })
    .then(dbTransaction => {
      res.json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
