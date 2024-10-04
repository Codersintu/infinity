const {Schema,model}=require("mongoose");


const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
      
    },
    desc: {
        type: String,
        required:true
    },
    photo: {
        type: String,
       required:false,
    },
    fullName: {
        type: String,
       required:true,
    },
    categories: {
        type: Array,
        required:false
    },
  
}, {
    timestamps: true
});

const Post =model('post', PostSchema);
module.exports = Post;
