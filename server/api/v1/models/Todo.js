import mongoose from 'mongoose';
import restful from 'node-restful';


const TodoSchema = mongoose.Schema({
  text: String,
  dueDate: Date,
  urgency: Number,
  completed: Boolean,
  author: {
    type: String,
    ref: 'User',
  },
}, {
  timestamps: true,
});

export default restful.model('Todo', TodoSchema);
