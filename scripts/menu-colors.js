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



const closeEveryItemInContainer = container => {
  const items = container.find(".colors__item");
  const content = container.find(".colors__content");

  item.removeClass("active");
  content.width(0);
}

const openItem = item => {
  const hiddenContent = item.find(".colors__content");
  const reqWidth = measureWidth(item);
  const textBlock = item.find(".colors__container");

  item.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$(".colors__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest(".colors__item");
  const itemOpened = item.hasClass("active");
  const container = $this.closest(".colors__menu")

  if (itemOpened) {
    closeEveryItemInContainer();
  } else {
    closeEveryItemInContainer();
    openItem(item);
  }

  openItem(item);
})

$(".colors__close").on("click", e => {
  e.preventDefault();

  closeEveryItemInContainer($('.colors__menu'));
})