const fs = require('fs')
const express = require('express');

const app = express();

// middleware
app.use(express.json());


// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({message: 'Hello from the server side', app: 'Na-tour-s'});
// });

// app.post('/', (req, res) =>{
//   res.send('You can post to this end point.....')
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})

app.get('/api/v1/tours/:id/', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id)

  // if(id > tours.length) {
  if(!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
})


app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

app.patch('/api/v1/tours/:id',(req, res) => {

  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated here>'
    }
  })
});

app.delete('/api/v1/tours/:id',(req, res) => {

  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
});


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});



// app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id/', getTour);
// app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);




// before getting new files for each
const fs = require('fs')
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. middle wares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


// 2. route handlers
// tours
const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({
    id: newId
  }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated here>'
    }
  })
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  })
};

// users

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error!',
    message: 'This route is not defined yet'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error!',
    message: 'This route is not defined yet'
  })
}
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error!',
    message: 'This route is not defined yet'
  })
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error!',
    message: 'This route is not defined yet'
  })
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error!',
    message: 'This route is not defined yet'
  })
}


// 3.routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


// 4. start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});