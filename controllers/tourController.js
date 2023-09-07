const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next();
}

// Router handlers 
exports.getAllTours = (req, res) =>{
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.getTour = (req, res) =>{

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
};

exports.createTour = (req, res) =>{
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

exports.updateTour = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            message: '<Updated tour>',
            tour
        }
    })
}

exports.deleteTour = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(204).json({
        status: 'success',
        data: null
    })
}