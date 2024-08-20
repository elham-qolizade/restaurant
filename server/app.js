const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3278;
app.use(cors());

app.get('/', (req, res) => {
   res.json([
      {
         "name": "Waffle with Berries",
         "category": "Waffle",
         "price": 6.50,
         "image": faker.image.food() 
      },
      {
         "name": "Vanilla Bean Crème Brûlée",
         "category": "Crème Brûlée",
         "price": 7.00,
         "image": faker.image.food() 
      },
      {
         "name": "Macaron Mix of Five",
         "category": "Macaron",
         "price": 8.00,
         "image": faker.image.food() 
      },
      {

         "name": "Classic Tiramisu",
         "category": "Tiramisu",
         "price": 5.50,
         "image": faker.image.food() 
      },
      {

         "name": "Pistachio Baklava",
         "category": "Baklava",
         "price": 4.00,
         "image": faker.image.food() 
      },
      {

         "name": "Lemon Meringue Pie",
         "category": "Pie",
         "price": 5.00,
         "image": faker.image.food() 
      },
      {
         "name": "Red Velvet Cake",
         "category": "Cake",
         "price": 4.50,
         "image": faker.image.food() 
      },
      {

         "name": "Salted Caramel Brownie",
         "category": "Brownie",
         "price": 4.50,
         "image": faker.image.food() 
      },
      {

         "name": "Vanilla Panna Cotta",
         "category": "Panna Cotta",
         "price": 6.50,
         "image": faker.image.food() 
      }
   ]);
});

app.listen(port, () => {
   console.log(`app listening at http://localhost:${port}`);
});