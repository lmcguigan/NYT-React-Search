const router = require("express").Router();
const notesController = require("../../controllers/notesController");

router.route("/")
  .get(notesController.findAll)
  .post(notesController.create);

router
  .route("/:id")
  .post(notesController.create)
  .get(notesController.findById)
  .put(notesController.update)
  .delete(notesController.remove);

module.exports = router;
