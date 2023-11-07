let getUser = (req,res)=>{
    try {
        res.status(200).send('user');
    } catch (error) {
        res.status(500).send("Somthing went wrong.")
    }
}

module.exports.getUser = getUser;

let addUser = (req,res)=>{
    try {
        res.status(201).send('user');
    } catch (error) {
        res.status(500).send("Somthing went wrong.")
    }
}

module.exports.addUser = addUser;