const mongoose = require('mongoose')

//connection to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/task_manager_api',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
})


