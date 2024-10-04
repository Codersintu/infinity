const {Schema,model}=require("mongoose");


const CategorieSchema = new Schema({
    name: {
        type: String,
        required: true
      
    },
  
}, {
    timestamps: true
});

const Categories =model('categories', CategorieSchema);
module.exports = Categories;
