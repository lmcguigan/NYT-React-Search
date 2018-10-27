const db = require("../models");

// Defining methods
module.exports = {
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    var note = {
        title: req.body.title,
        text: req.body.text
    };
    db.Note.create(note)
      .then(function (dbNote){
        return db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {notes: dbNote._id}}, {new: true});
      })   
      .then(dbArticle=>res.json(dbArticle))
      .catch(err=>res.status(422).json(err));  
  },
  update: function(req, res) {
    console.log(req.body);
    var updatedNote = {
        title: req.body.title,
        body: req.body.body
    };
    db.Note
      .findOneAndUpdate({ _id: req.params.id }, updatedNote)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Note
      .findOneAndRemove({_id: req.params.id})
      .then(dbNote => res.json({dbNote, message:"Note Deleted"}))
      .catch(err => res.status(422).json(err));
  }
};
