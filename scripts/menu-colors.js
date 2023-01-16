const measureWidth = item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest(".color__menu");
  const titlesBlocks = container.find(".colors__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find(".colors__container");
  const paddingLeft = parseInt(textContainer.css("padding-left"));
  const paddingRight = parseInt(textContainer.css("padding-right"));

  const isMobile = window.matchMedia("(max-width:768px)").matches;

  if (isMobile) {
    reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingRight - paddingLeft
  }
};

$('.colors__item').on('click', function (e) {
  e.preventDefault()
  $('.colors__content').css('width', '0px')
  $(this).next().css('width', '50%')
})

$('.colors__close-button').on('click', function (e) {
  e.preventDefault()
  $('.colors__content').css('width', '0px')
})


