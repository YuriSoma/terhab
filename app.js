const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/*app.get('/', (req, res) => {
    res.status(200).json({message:'Hello world form Express'});
});*/

const getAllTours = (req, res) =>{
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req, res) =>{

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
};

const creatTour = (req, res) =>{
    /*console.log(req.body);
    res.status(200).send('Done');*/

    const newTour = Object.assign({id : tours.length * 1}, req.body);

    tours.push(newTour)

    fs.writeFile
    (`${__dirname}/dev-data/data/tours-simple.json`, 
        JSON.stringify(tours), err => {
        res.status(201).json(
            {
                status: 'success', 
                data: {
                    tour: newTour
                }
            }
        )   
     })
}

const updateTour = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            message: '<Updated tour>',
            tour
        }
    })
}

const deleteTour = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}

/*app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', creatTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);*/

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(creatTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})