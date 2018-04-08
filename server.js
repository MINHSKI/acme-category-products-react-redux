const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(require('body-parser').json());


app.get('/api/products', (req, res, next)=> {
  Product.findAll({
  })
    .then( products => res.send(products))
    .catch(next);
});

app.get('/api/categories', (req, res, next)=> {
  Category.findAll({
  })
    .then( products => res.send(products))
    .catch(next);
});

app.post('/api/categories/:id/products', (req, res, next)=> {
  Product.create({ categoryId: req.params.id })
    .then( product => res.send(product))
    .catch(next);
});

app.delete('/api/categories/:id', (req, res, next)=> {
  Category.findById(req.params.id)
    .then( category => {
      return Promise.all([
        category.destroy(),
        Product.destroy({ where: { categoryId: category.id }})
      ]);
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/categories/:categoryId/products/:id', (req, res, next)=> {
  Product.findOne({ where: { 
    categoryId: req.params.categoryId,
    id: req.params.id
  }})
    .then( product => {
      return product.destroy();
    })
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.post('/api/categories', (req, res, next)=> {
  Category.create({})
    .then( category => res.send(category))
    .catch(next);
});


app.use((err, req, res, next)=> {
  res.status(500).send(err);
});
const port = process.env.PORT || 3000;


const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_app');


const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull:  false
  }
},
  {
    hooks: {
      beforeValidate: function(category){
        if(!category.name){
          category.name = `${generateRandomNumber()}-Category` 
        }
      }
    }
  });

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
},
  {
    hooks: {
    beforeValidate: function(product){
      if(!product.name){
        product.name = `${generateRandomNumber()}-Product` 
      }
    }
  }
  });

const generateRandomNumber = ()=> {
  return Math.round(Math.random()*1000);
};

Product.belongsTo(Category);

conn.sync({ force: true })
  .then( ()=> Promise.all([
    Category.create(),
    Category.create(),
    Category.create(),
    Product.create(),
    Product.create(),
    Product.create(),
    Product.create(),
  ]))
  .then(([c1, c2, c3, p1, p2, p3, p4])=>Promise.all([
    p1.setCategory(c1),
    p2.setCategory(c2),
    p3.setCategory(c3),
    p4.setCategory(c3)
  ]));


app.listen(port, ()=> console.log(`listening on port ${port}`));
