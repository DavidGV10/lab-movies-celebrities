const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")
router.route("/create")
    .get((req, res)=>{
        Celebrity.find()
        .then(all => {
            res.render("movies/new-movie", {all}) 
        })    
    })
    .post(async (req, res)=>{
        try{
            const {title, genre, plot, cast} = req.body
            const newMovie = await Movie.create({title, genre, plot, cast})
            res.redirect("/movies")
        }
        catch(err){
            console.log(err)
        }
    })
    
router.route("/:id/update")
    .get( async (req, res)=>{
        const id = req.params.id
        const thismovie = await Movie.findById(id)
        res.render("movies/edit-movie", thismovie)
    })
    .post(async (req, res)=>{
        try{
            const {title, genre, plot, cast} = req.body
            const newMovie = await Movie.create({title, genre, plot, cast})
            res.redirect("/movies")
        }
        catch(err){
            console.log(err)
        }
    })


router.get("/:id/delete", async (req, res)=>{
    try{
        const id = req.params.id
        const movie = await Movie.findByIdAndDelete(id)
        res.redirect("/movies")
    }
    catch(err){
        console.log(err)
    }
 
})
router.get("/:id/update", (req, res)=>{
    const id = req.params.id
})
router.get("/:id", async (req, res)=>{
    try{
        const id = req.params.id
        const moviedetail = await Movie.findById(id).populate("cast")
        res.render("movies/movie-details", moviedetail)
    }
    catch(err){
        console.log(err)
    }
    
})

router.get("/", async (req, res)=>{
    try{
        const allMovies = await Movie.find().populate("cast")
        res.render("movies/movies", {allMovies})
    }
    catch(err){
        console.log(err)
    }
    
})


module.exports = router