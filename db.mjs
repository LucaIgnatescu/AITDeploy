import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const userSchema = new Schema({
  username: {type:String, required: true},
  hash: {type:String, required: true}, //hashed password,
  salt: {type:String, required: true}, //password salt,
  files: [{type: Schema.Types.ObjectId, ref: 'File'}] //a list of references to files owned by user
});

const fileSchema = new Schema({
  fileName: {type: String, required:true, maxLength: 12}, //name of file to be set by user
  owner: {type:Schema.Types.ObjectId, ref: 'User', required:true}, //reference to user that created the file,
  data: {type: Buffer, required: true}, //binary data of actual markdown file (possibly encrypted),
  uploadDate: {type: Date, required:true},
  size: {type: Number, required:true} //size of binary data,
  //possible other metadata to be added later
})

mongoose.model('User',userSchema);
mongoose.model('File', fileSchema);
