//* course
/* 1. Vue Instance */
/* 2. Attribute Binding */
/* 3. Conditional Rendering */
/* 4. List Rendering */
/* 5. event handling */
/* 6. Class & Style Binding */
/* 7. Computed Properties */
/* 8. Components */
/* 9. communicating events */
/* 10. forms */



// child component
Vue.component('product-detail', {
    template: `
        <p>ini comoponent product detail</p>
    `
});

// child component
Vue.component('product', {
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="masker_mahal">
            </div>
            <div class="product-info">
                <p>User is premium : {{ premium }}</p>
                <p v-if="inStock">In Stock </p>
                <p v-else :class="{ outOfStock : !inStock }">Out Of Stock</p>
                <p>Shipping : {{ shipping }}</p>

                <h1>{{ title }}</h1>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
                    :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                    <p>{{ variant.variantColor }}</p>
                </div>

                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disableButton: !inStock }">Add To Cart</button>&nbsp;
                <button v-on:click="cancelToCart">Cancel</button>

            </div>
        </div>
    `,
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
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
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        cancelToCart() {
            this.$emit('cancel-to-cart')
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: { // onInit
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            // if (this.quantity > 0) {
            //     return true;
            // } else {
            //     return false;
            // }
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            if (this.premium) {
                return 'FREE'
            } else {
                return 2.99
            }
        }
    }
});

// root component
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        cancelCart() {
            this.cart.pop()
        }
    }
});