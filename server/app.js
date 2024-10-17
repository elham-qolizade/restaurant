const express = require('express');
const cors = require('cors');
const { faker } = require('https://apilist.fun/company/kkk');
const app = express();
const port = 1044;
app.use(cors());

app.get('/', (req, res) => {
    const products = [
        {
            "name": {
                "en": "Waffle with Berries",
                "fa": "وافل با توت‌فرنگی"
            },
            "category": {
                "en": "Waffle",
                "fa": "وافل"
            },

            "price": 6.50,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Vanilla Bean Crème Brûlée",
                "fa": "وانیل بیان کرم بروله"
            },
            "category": {
                "en": "Crème Brûlée",
                "fa": "کرم بروله"
            },

            "price": 7.00,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Macaron Mix of Five",
                "fa": "ماکارون مخلوط پنج تایی"
            },
            "category": {
                "en": "Macaron",
                "fa": "ماکارون"
            },
            "price": 8.00,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Classic Tiramisu",
                "fa": "تیرامیسو کلاسیک"
            },
            "category": {
                "en": "Tiramisu",
                "fa": "تیرامیسو"
            },

            "price": 5.50,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Pistachio Baklava",
                "fa": "باقلوا پسته"
            },
            "category": {
                "en": "Baklava",
                "fa": "باقلوا"
            },

            "price": 4.00,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Lemon Meringue Pie",
                "fa": "پای مرنگ لیمویی"
            },
            "category": {
                "en": "pie",
                "fa": "پای"
            },
            "price": 5.00,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Red Velvet Cake",
                "fa": "کیک قرمز مخملی"
            },
            "category": {
                "en": "cake",
                "fa": "کیک"
            },

            "price": 4.50,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Salted Caramel Brownie",
                "fa": "براونی کاراملی شور"
            },
            "category": {
                "en": "Brownie",
                "fa": "براونی"
            },

            "price": 4.50,
            "image": faker.image.food()
        },
        {
            "name": {
                "en": "Vanilla Panna Cotta",
                "fa": "پاناکوتا وانیلی"
            },
            "category": {
                "en": "Panna Cotta",
                "fa": "پاناکوتا"
            },

            "price": 6.50,
            "image": faker.image.food()
        },

    ];

    const productsWithDualLanguage = products.map(product => {
        return {
            ...product,
            "name_en": product.name.en,
            "name_fa": product.name.fa,
            "category_en": product.category.en,
            "category_fa": product.category.fa
        };
    });

    res.json(productsWithDualLanguage);
});
2
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});