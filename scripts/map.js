let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.93, 30.31],
    zoom: 11
  });

  const coords = [
    [59.94, 30.38],
    [59.91, 30.50],
    [59.88, 30.31],
    [59.97, 30.31],
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./img/marker.jpg",
    iconImageSize: [30, 42],
    iconImageOffset: [-3, -42]
    })

    coords.forEach(coord => {
      myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);