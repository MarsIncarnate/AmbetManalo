import wixData from 'wix-data';
import wixLocationFrontend from 'wix-location-frontend';

$w.onReady(function () {

	function findUpdate(catName, index, imageId, titleId, yearId, descId, boxId) {
		let query = wixData.query("Portfolio1");

		if (catName !== "all") {
			query = query.eq('category', catName);
		}

		query.find()
			.then((results) => {
				if (results.items.length > 0) {
					const item = results.items[index];
					console.log(item);
					$w(imageId).src = item.image;
					$w(titleId).text = item.title;
					$w(yearId).text = item.year;
					$w(descId).text = item.previewText;
					$w(imageId).show();
					$w(boxId).show();
					const formattedTitle = item.title.replace(/\s+/g, '-').toLowerCase();
					const itemPagePath = `/objects/${formattedTitle}`;
					$w(imageId).onClick(() => {
						console.log(itemPagePath);
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
	{ imageId: '#imageX25', titleId: '#text103', yearId: '#text102', descId: '#text101', boxId: '#box74' },
	{ imageId: '#imageX23', titleId: '#text97', yearId: '#text96', descId: '#text95', boxId: '#box68' },
	{ imageId: '#imageX24', titleId: '#text100', yearId: '#text99', descId: '#text98', boxId: '#box71' },
	{ imageId: '#imageX26', titleId: '#text106', yearId: '#text105', descId: '#text104', boxId: '#box77' }
    // Add more items as needed
];

let dropdownValue = 'all'

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
	$w('#box41').onViewportEnter(() => {
        $w('#section17').hide("fade", { duration: 200 })
		$w('#section18').hide("fade", { duration: 200 })
    })
    $w('#box41').onViewportLeave(() => {
		$w('#section17').show("fade", { duration: 200 })
        $w('#section18').show("fade", { duration: 200 })
    })

	
});