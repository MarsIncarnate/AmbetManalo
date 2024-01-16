import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(async function () {
    $w('#box41').onViewportEnter(() => {
        $w('#section17').hide("fade", { duration: 200 })
    })
    $w('#box41').onViewportLeave(() => {
        $w('#section17').show("fade", { duration: 200 })
    })
    // Base name of product pages
    const basePageName = 'products';

    // Get the current page's name
    const currentPageName = wixLocation.path[0];

    // Fetch all product slugs from the "Products" collection
    const productSlugs = await getProductsSlugs();

    // Find the index of the current page in the array of product slugs
    const currentPageIndex = productSlugs.indexOf(currentPageName.replace(basePageName, ''));

    // Calculate the next and previous page indexes
    const nextPageIndex = currentPageIndex + 1;
    const prevPageIndex = currentPageIndex - 1;

    // Set the links for next and previous pages
    const nextPageLink = nextPageIndex < productSlugs.length ? `/${basePageName}/${productSlugs[nextPageIndex]}` : null;
    const prevPageLink = prevPageIndex >= 0 ? `/${basePageName}/${productSlugs[prevPageIndex]}` : null;

    // Hide or show the next and previous buttons based on availability
    if (nextPageLink) {
        $w('#button2').link = nextPageLink;
        $w('#button2').show();
    } else {
        $w('#button2').hide();
    }

    if (prevPageLink) {
        $w('#previousBtn').link = prevPageLink;
        $w('#previousBtn').show();
    } else {
        $w('#previousBtn').hide();
    }
});

async function getProductsSlugs() {
    // Query the "Products" collection to get all product slugs
    const results = await wixData.query('Stores/Products')
        .find();

    // Extract and return an array of product slugs
    return results.items.map(item => item.slug);
}
