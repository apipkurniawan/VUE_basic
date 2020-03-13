//* course
/* 1. Vue Instance */
/* 2. Attribute Binding */
/* 3. Conditional Rendering */
/* 4. List Rendering */



var app = new Vue({
    el: '#app',
    data: {
        firstName: 'apip',
        lastName: 'kurniawan',
        message: "latihan",
        product: "masker",
        desc: "this is the expensive mask",
        image: "./assets/masker.jpg",
        link: "https://www.google.com/search?safe=strict&sxsrf=ALeKk03ACoI31Qdd-icmu-IA3VxntMW8uQ%3A1584092776970&source=hp&ei=aFZrXpDlOIjFrQGG6KjAAw&q=google+translate&oq=GOOG&gs_l=psy-ab.1.0.35i39l3j0i131i67j0i67j0i131j0j0i131j0j0i131.2064.2556..4549...1.0..0.87.281.4......0....1..gws-wiz.IP9XX5D6_Y0",
        inStock: true,
        inventory: 9,
        details: [
            "80% cotton",
            "20% polyester",
            "gender-neutral"
        ],
        variants: [{
                variantId: 2238,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ]
    }
});