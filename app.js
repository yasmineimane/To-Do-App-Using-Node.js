const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true }));

const listTasks = [
    {
        id: 1,
        title: 'coock',
    },
    {
        id: 2,
        title: 'Learn new things',
    },

];

app.get('/', (req, res) => {
    return res.render('home', {
        data: listTasks,
    });
});

app.post('/add', (req, res) => {
    const {title} = req.body;
    const id = Math.floor(Math.random() * 1000);
    
    listTasks.push({
        id,
        title,
    });
    return res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = listTasks.findIndex(task => task.id == id);
    listTasks.splice(index, 1);
    return res.redirect('/');
});

app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const task = listTasks.find(task => task.id == id);
    return res.render('update', {
        task,
    });
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const index = listTasks.findIndex(task => task.id == id);
    listTasks[index] = {
        id,
        title,
    };
    
    return res.redirect('/');
});






app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});