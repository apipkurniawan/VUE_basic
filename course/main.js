//* course beginner
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
/* 10. Tabs */
//* course beginner




var eventBus = new Vue()

// child component
Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab" 
                  :class="{ activeTab: selectedTab === tab }"
                  v-for="(tab, index) in tabs" 
                  :key="index" 
                  @click="selectedTab = tab">{{ tab }}</span>
        </div>
        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">there are no reviews yet</p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating : {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
        </div> 
        <div v-show="selectedTab === 'Make a Review'">
            <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews' // set from @click
        }
    }
});

// child component
Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p>
                <label for="name">Name : </label>
                <input required id="name" v-model="name" placeholder="name">
            </p>
            <p>
                <label for="review">Review : </label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating : </label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            rating: null,
            review: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if (!this.name) this.errors.push("Name Required!")
                if (!this.review) this.errors.push("Review Required!")
                if (!this.rating) this.errors.push("Rating Required!")
            }

        }
    }
});

// child component
Vue.component('product-detail', {
    template: `
        <p>ini comoponent product detail</p>
    `
});

// child component
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <h1>{{ title }}</h1>
            <div class="product-image">
                <img :src="image" :alt="masker_mahal">
            </div>
            <div class="product-info">
                <p>Shipping : {{ shipping }}</p>
                <p v-if="inStock">In Stock </p>
                <p v-else :class="{ outOfStock : !inStock }">Out Of Stock</p>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div class="grid-container">
                    <div class="grid-item" v-for="(variant, index) in variants" :key="variant.variantId"
                        :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                    </div>                
                </div>
                
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disableButton: !inStock }">Add To Cart</button>&nbsp;
                <button v-on:click="cancelToCart">Cancel</button>    
            </div>
            <br>
            <product-tabs :reviews="reviews"></product-tabs>

        </div>
    `,
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
        },
        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }
    }
});

// root component
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
        reviews: [],
        errors: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        cancelCart() {
            this.cart.pop()
        }
    },
});