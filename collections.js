import wixData from 'wix-data';
import wixLocationFrontend from 'wix-location-frontend';

$w.onReady(function () {

	function findUpdate(catName, index, imageId, titleId, yearId, descId, boxId) {
		wixData.query("Portfolio1")
			.eq('category', catName)
			.find()
			.then((results) => {
				if(results.items.length > 0) {
					const item = results.items[index];
					$w(imageId).src = item.image
					$w(titleId).text = item.title
					$w(yearId).text = item.year
					$w(descId).text = item.previewText
					$w(imageId).show()
					$w(boxId).show()
					const formattedTitle = item.title.replace(/\s+/g, '-').toLowerCase();
                    const itemPagePath = `/objects/${formattedTitle}`;
					$w(imageId).onClick(() => {
						console.log(itemPagePath)
                        // Navigate to the corresponding item page
                        wixLocationFrontend.to(itemPagePath);
                    });
				} else {
				// handle case where no matching items found
				}
			})
			.catch((err) => {
				console.log(err);
			});	
	}

	
	let itemsArr = [
    { imageId: '#imageX7', titleId: '#text46', yearId: '#text47', descId: '#text48', boxId: '#box44' },
    { imageId: '#imageX14', titleId: '#text57', yearId: '#text56', descId: '#text55', boxId: '#box49' },
    { imageId: '#imageX15', titleId: '#text54', yearId: '#text53', descId: '#text52', boxId: '#box47' },
	{ imageId: '#imageX16', titleId: '#text60', yearId: '#text59', descId: '#text58', boxId: '#box55' },
	{ imageId: '#imageX17', titleId: '#text63', yearId: '#text62', descId: '#text61', boxId: '#box57' },
	{ imageId: '#imageX18', titleId: '#text66', yearId: '#text65', descId: '#text64', boxId: '#box59' },
	{ imageId: '#imageX19', titleId: '#text69', yearId: '#text68', descId: '#text67', boxId: '#box61' },
    // Add more items as needed
];

let dropdownValue = 'Furniture'

for (let i = 0; i < itemsArr.length; i++) {
    findUpdate(dropdownValue, i, itemsArr[i].imageId, itemsArr[i].titleId, itemsArr[i].yearId, itemsArr[i].descId, itemsArr[i].boxId);
}

$w('#dropdown1').onChange((event) => {
        // Access the new value
        const newValue = event.target.value;
        console.log('Dropdown value changed to:', newValue);
		for (let i = 0; i < itemsArr.length; i++) {
			findUpdate(newValue, i, itemsArr[i].imageId, itemsArr[i].titleId, itemsArr[i].yearId, itemsArr[i].descId, itemsArr[i].boxId);
		}
    });

	
});