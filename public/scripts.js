(() => {
  const headingReading = document.querySelector('#heading-reading');
  const compassImg = document.querySelector('#compass img');

  const initSensor = () => {
    // Start sensor reading from magnetometer
    setInterval(() => {
      let heading = Math.floor(Math.random() * 360);
      updateHeadingReading(heading);
      rotateCompass(heading);
    }, 2000);
  };

  const updateHeadingReading = heading => {
    headingReading.innerText = heading;
  };

  const rotateCompass = heading => {
    compassImg.style.transform = `rotate(-${heading}deg)`;
  };

  initSensor();
})();
