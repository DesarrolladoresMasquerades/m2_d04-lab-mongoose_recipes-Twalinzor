const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

// Connection to the database "recipe-app"
mongoose
  .connect(
    "mongodb+srv://Stan:ironhack2022@cluster0.wgkvi.mongodb.net/RecipeDB?retryWrites=true&w=majority"
  )
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((response) => {
    console.log("RESPONSE ======>", response);
    // Recipe.create();

    Recipe.insertMany(data)
      .then(() =>
      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { $set: { duration: 100 } },
        { new: true }
      )
        .then(() => {
          Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
            console.log("carrot");
          });
        })
    );
  })    
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
mongoose.connection.close();
  //Recipe.deleteOne({title:"Carrot Cake"})
    //.then(()=>{console.log("Carrot Cake Deleted")})
  