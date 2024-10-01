const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const app = express();
const port = 3220;
app.use(cors());

app.get('/', (req, res) => {
    const products = [
        {
            "name": {
                "en": "Waffle with Berries",
                "fa": "وافل با توت‌فرنگی"
            },
            "category": "Waffle",
            "price": 6.50,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Vanilla Bean Crème Brûlée",
                "fa": "وانیل بیان کرم بروله"
            },
            "category": "Crème Brûlée",
            "price": 7.00,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Macaron Mix of Five",
                "fa": "ماکارون مخلوط پنج تایی"
            },
            "category": "Macaron",
            "price": 8.00,
            "image": faker.image.food()
        },
        {
         "name": {
             "en": "Macaron Mix of Five",
             "fa": "ماکارون مخلوط پنج تایی"
         },
         "category": "Macaron",
         "price": 8.00,
         "image": faker.image.food()
     },
     {
      "name": {
          "en": "Macaron Mix of Five",
          "fa": "ماکارون مخلوط پنج تایی"
      },
      "category": "Macaron",
      "price": 8.00,
      "image": faker.image.food()
  },
  {
   "name": {
       "en": "Macaron Mix of Five",
       "fa": "ماکارون مخلوط پنج تایی"
   },
   "category": "Macaron",
   "price": 8.00,
   "image": faker.image.food()
},
{
   "name": {
       "en": "Macaron Mix of Five",
       "fa": "ماکارون مخلوط پنج تایی"
   },
   "category": "Macaron",
   "price": 8.00,
   "image": faker.image.food()
},
{
   "name": {
       "en": "Macaron Mix of Five",
       "fa": "ماکارون مخلوط پنج تایی"
   },
   "category": "Macaron",
   "price": 8.00,
   "image": faker.image.food()
},
     
    ];

    const productsWithDualLanguage = products.map(product => {
        return {
            ...product,
            "name_en": product.name.en,
            "name_fa": product.name.fa
        };
    });

    res.json(productsWithDualLanguage);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});