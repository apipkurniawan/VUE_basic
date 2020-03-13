//* course
/* 1. Vue Instance */
/* 2. Attribute Binding */
/* 3. Conditional Rendering */
/* 4. List Rendering */
/* 5. event handling */
/* 6. Class & Style Binding */
/* 7. Computed Properties */



var app = new Vue({
    el: '#app',
    data: {
        firstName: 'apip',
        lastName: 'kurniawan',
        message: "latihan",
        product: "masker",
        brand: 'vue mastery',
        desc: "this is the expensive mask",
        link: "https://www.google.com/search?safe=strict&sxsrf=ALeKk03ACoI31Qdd-icmu-IA3VxntMW8uQ%3A1584092776970&source=hp&ei=aFZrXpDlOIjFrQGG6KjAAw&q=google+translate&oq=GOOG&gs_l=psy-ab.1.0.35i39l3j0i131i67j0i67j0i131j0j0i131j0j0i131.2064.2556..4549...1.0..0.87.281.4......0....1..gws-wiz.IP9XX5D6_Y0",
        inventory: 9,
        details: [
            "80% cotton",
            "20% polyester",
            "gender-neutral"
        ],
        selectedVariant: 0,
        variants: [{
                variantId: 2238,
                variantColor: "green",
                variantImage: "./assets/masker2.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/masker3.jpg",
                variantQuantity: 5
            },
            {
                variantId: 2236,
                variantColor: "red",
                variantImage: "./assets/masker.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        cancelToCart() {
            if (this.cart > 0)
                this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
            // this.image = variantImage;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
});