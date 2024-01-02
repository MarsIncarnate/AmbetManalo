import wixData from 'wix-data';
import { currentCart } from 'wix-ecom-backend';
import wixLocationFrontend from 'wix-location-frontend';

$w.onReady(function () {
    // Function to populate the dropdown and handle product filtering
    function populateDropdown(categories) {
        const dropdownOptions = categories.map(category => {
            return { label: category.name, value: category._id };
        });

        $w('#dropdown1').options = dropdownOptions;

        $w('#dropdown1').onChange(event => {
            const selectedCategoryId = event.target.value;
            filterProductsByCategory(selectedCategoryId);
        });
    }

    // Function to filter products by category and update the repeater
    function filterProductsByCategory(categoryId) {
        wixData.query("Stores/Products")
            .hasSome("collections", [categoryId])
            .find()
            .then(results => {
                if (results.items.length > 0) {
                    $w('#repeater1').data = results.items;
                } else {
                    console.log('No products found in the specified category.');
                    $w('#repeater1').data = [];
                }
            })
            .catch(error => {
                console.error('Error querying products:', error);
            });
    }

    // Function to add a product to the cart
    async function addToCart(options) {
        try {
            const updatedCurrentCart = await currentCart.addToCurrentCart(options);
            console.log('Success! Updated current cart:', updatedCurrentCart);
            return updatedCurrentCart;
        } catch (error) {
            console.error(error);
            // Handle the error
        }
        }
    

    // Fetch categories and populate the dropdown
    wixData.query("Stores/Collections")
        .find()
        .then(categoryResults => {
            if (categoryResults.items.length > 0) {
                populateDropdown(categoryResults.items);
            } else {
                console.log('No categories found.');
            }
        })
        .catch(categoryError => {
            console.error('Error querying categories:', categoryError);
        });

    // Define how to set up each new repeater item
    $w('#repeater1').onItemReady(($item, itemData) => {
        // Replace with your actual image field name
        $item('#imageX7').src = itemData.mainMedia;
        
        // Assuming you have fields named 'productName' and 'price' in your collection
        $item('#text46').text = itemData.name;
        $item('#text47').text = `$${itemData.price}`;

        const formattedTitle = itemData.name.replace(/\s+/g, '-').toLowerCase();
        $item('#imageX7').link = `/products/${formattedTitle}`;
        $w('#imageX7').onClick(() => {
            console.log(`/products/${formattedTitle}`)
            // Navigate to the corresponding item page
            wixLocationFrontend.to(`/products/${formattedTitle}`);
        });

        // Link the button to add the product to the cart
        $item('#button1').onClick(() => {
            const options = {
                "lineItems": [{
                    "catalogReference": {
                    // Wix Stores appId
                    "appId": "215238eb-22a5-4c36-9e7b-e7c08025e04e",
                    // Wix Stores productId
                    "catalogItemId": itemData._id,
                    },
                    "quantity": 1
                }]
                };

                addToCart(options)
                .then((updatedCurrentCart) => {
                    console.log('Success! Updated cart:', updatedCurrentCart);
                    return updatedCurrentCart;
                })
                .catch((error) => {
                    console.error(error);
                    // Handle the error
                });
    });

    });

    // Initially, load all products from the first category (you can change this)
    filterProductsByCategory('00000000-000000-000000-000000000001');
});
