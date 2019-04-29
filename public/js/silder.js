

window.slider = function(prev, next, dots, slides, dotsDom) {
  let slideIndex = 1;
  
  function isMatchDot(target) {
    return target.matches(".dot");
  }
  
  dotsDom && dotsDom.addEventListener("click", event => {
      event.stopPropagation();
      event.preventDefault();
       if (isMatchDot(event.target)) {
        
       showSlides((slideIndex = event.target.id));
         }
  })

  const showSlides = n => {
    var i;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      dots[i].className = dots[i].className.replace(" active", "");
    }


    console.log('slideIndex',slideIndex)
    slides[Number(slideIndex) - 1].style.display = "block";
    dots[Number(slideIndex) - 1].className += " active";
  };

  showSlides(slideIndex);

  prev.addEventListener("click", () => {
    showSlides(slideIndex = (Number(slideIndex) -1));
  });

  next.addEventListener("click", () => {
    showSlides((slideIndex = (Number(slideIndex) -1)));
  });
};
