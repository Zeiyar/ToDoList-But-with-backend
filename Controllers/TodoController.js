const Todo = require("../Model/TodoModel");

exports.createTodo = async(req,res,next) => {
    try{
        const {note,category} = req.body;
        if (!note) return res.status(404).json({message :"note n existe pas"})

        const existing = await Todo.findOne({note});
        if (existing) return res.status(400).json({message : "note déjà existante"});

        const todo = await Todo.create({note,category});
        res.status(201).json(todo);
    }catch(err){
        next(err)
    }
};
exports.getTodo = async(req,res,next) => {
    try{
        const todo = await Todo.find();
        if(!todo) return res.status(400).json({message : "no list of things todo"});
        res.status(200).json(todo);
    }catch(err){
        next(err)
    }
};
exports.updateTodo = async(req,res,next) => {
    try{
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({message :"introuvable"})
        todo.done = !todo.done;
        await todo.save();
        res.status(200).json({message : 
            todo.done 
            ?`thing done ${todo.note}`
            :`thing undone ${todo.note}`
        })
    }catch(err){
        next(err)
    }
};
exports.deleteTodo = async(req,res,next) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({message :"introuvable"});
        res.status(200).json({message : `${todo.note} bien supprimer!`});
    }catch(err){
        next(err)
    }
};

exports.searchTodo = async(req,res,next) => {
    try{
        const {term,limit,page,sort} = req.query;
        const skip = ((page|| 1)-1)*limit ;

        if(!term) return res.status(400).json({message :"term doesnt exist"});

        const query = {
            $or:[
                {note:{$regex:term,$options:"i"}},
                {category:{$regex:term,$options:"i"}}
            ]
        };
        
        const todo = await Todo.find(query).sort({[sort]:-1}).skip(skip).limit(limit);

        if (todo.length===0) return res.status(404).json({message :"term not found"});

        const totalResults = await Todo.countDocuments(query);
        const totalPages = Math.ceil(totalResults / limit);

        res.status(200).json({page,totalPages,totalResults,data:todo});
    }catch(err){
        next(err);
    }
};

exports.getUserInfo = (req,res)=>{
    res.json({
        message : "profil utilisateur :",
        user : req.user
});
};