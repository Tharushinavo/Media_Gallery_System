const Contact = require('../models/Contact');

const submitMessage = async (req, res) => {
  const message = await Contact.create({ userId: req.user._id, message: req.body.message });
  res.status(201).json(message);
};

const getMessages = async (req, res) => {
  const messages = await Contact.find().populate('userId');
  res.json(messages);
};

const deleteMessage = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

module.exports = { submitMessage, getMessages, deleteMessage };