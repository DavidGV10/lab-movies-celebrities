const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model")

router.route("/create")
    .get((req, res)=>{
        res.render("celebrities/new-celebrity")
    })
    .post((req, res)=>{
        const {name, occupation, catchPhrase} = req.body
        Celebrity.create({name, occupation, catchPhrase})
        .then(celebrity => {
            res.redirect("/celebrities")
        })
        .catch(err => {
            res.render("celebrities/new-celebrity")
        })
    })
router.get("/", async (req, res)=>{
    try{
        const all = await Celebrity.find()
        res.render("celebrities/celebrities", {all})
    }
    catch(err){
        console.log(err)
    }
    

})

module.exports = router