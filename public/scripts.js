(() => {
  const headingReading = document.querySelector('#heading-reading');
  const compassImg = document.querySelector('#compass img');
  const errorDisplay = document.querySelector('#error-display');

  const displayError = text => {
    errorDisplay.style = 'display: block;';
    errorDisplay.innerText = text;
  };
  
  // // For initial compass display testing
  // const initSensor = () => {
  //   // Start sensor reading from magnetometer
  //   setInterval(() => {
  //     let heading = Math.floor(Math.random() * 360);
  //     updateHeadingReading(heading);
  //     rotateCompass(heading);
  //   }, 1000);
  // };

  const initSensor = () => {
    magSensor.addEventListener('error', handleError);
    magSensor.addEventListener('reading', determineHeading);
    startSensorReading(magSensor);
  };

  const determineHeading = () => {
    let x = magSensor.x;
    let y = magSensor.y;
    let z = magSensor.z;

    console.log('x:', x, 'y:', y, 'z:', z);
  };

  const handleError = event => {
    if (event.error.name === 'NotReadableError') {
      displayError('Magnetometer not available on this device.');
    } else if (event.error.name === 'NotAllowedError') {
      displayError('Permission to access sensor was denied.');
    }
  };

  const startSensorReading = sensor => {
    sensor.start();
  };

  const stopSensorReading = sensor => {
    sensor.stop();
  };

  const updateHeadingReading = heading => {
    headingReading.innerText = heading;
  };

  const rotateCompass = heading => {
    compassImg.style.transform = `rotate(-${heading}deg)`;
  };

  try {
    const magSensor = new Magnetometer({ frequency: 10 });
    initSensor();
  }
  catch (error) {
    console.error(error);
    displayError('Magnetometer not available on this device.');
  }
})();
