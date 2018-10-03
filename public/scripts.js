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

  const initSensor = sensor => {
    sensor.addEventListener('error', handleError);
    sensor.addEventListener('reading', determineHeading.bind(sensor));
    startSensorReading(sensor);
  };

  const determineHeading = () => {
    let x = absOrientSensor.x;
    let y = absOrientSensor.y;
    let z = absOrientSensor.z;

    console.log('x:', x, 'y:', y, 'z:', z);
  };

  const handleError = event => {
    if (event.error.name === 'NotReadableError') {
      displayError('Absolute Orientation not available on this device asdad.');
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
    const absOrientSensor = new AbsoluteOrientationSensor({ frequency: 10 });
    initSensor(absOrientSensor);
  }
  catch (error) {
    console.error(error);
    displayError('Absolute Orientation not available on this device.');
  }
})();
