import mongoose from 'mongoose';
import restful from 'node-restful';


const user = mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  username: String,
  password: String,
  email: String,
  birthday: Date,
}, {
  timestamps: true,
});

export default restful.model('User', user);
