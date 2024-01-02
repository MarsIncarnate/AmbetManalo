import wixLocationFrontend from 'wix-location-frontend';
import wixWindowFrontend from 'wix-window-frontend';



$w.onReady(function () {    
    function scrollToSection() {
        wixWindowFrontend.getBoundingRect()
        .then( (windowSizeInfo) => {
          let scrollY = windowSizeInfo.scroll.y;  
          console.log(scrollY)  
          if (scrollY < 820) {
            wixLocationFrontend.to("#section15");
          } 
        } );
          
      }
      
    if(wixWindowFrontend.formFactor === "Desktop"){
      setTimeout(() => scrollToSection(), 500);
      } 
  });
