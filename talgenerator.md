<html lang="de">
<head>
	<meta charset="UTF-8">
	<title>Talgenerator</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.js"></script>
</head>
<body>
	<script>
		var sliderDistance;
		var sliderTiltL;
		var sliderTiltR;
		var sliderWaterHeight;
		function setup(){
			createCanvas(800, 800, WEBGL);
			sliderDistance = createSlider(0, 400, 0, 1);
			sliderDistance.position(810, 10);
			sliderTiltL = createSlider(0, 60, 20, 0.1);
			sliderTiltR = createSlider(0, 60, 20, 0.1);
			sliderWaterHeight = createSlider(0, 100, 20, 1);
			angleMode(DEGREES);
		}
		function draw(){
			fill(255);
			translate(0, 200);
			ortho(-width/2, width/2, -height/2, height/2, 0, 1000);
			scale(0.7);
			rotateY(-10);
			rotateX(-10);
			background(220);
			
			translate(-sliderDistance.value()/2, 0);
			
			rotate(-sliderTiltL.value());
			translate(0, -200);
			box(1, 400, 400);
			translate(0, 200);
			rotate(sliderTiltL.value());
			
			translate(sliderDistance.value(), 0);
			
			rotate(sliderTiltR.value());
			translate(0, -200);
			box(1, 400, 400);
			translate(0, 200);
			rotate(-sliderTiltR.value());
			
			translate(-sliderDistance.value()/2, 0);
			
			fill(0, 0, 255);
			translate(0, -sliderWaterHeight.value());
			box(1000, 1, 400);
			translate(0, sliderWaterHeight.value());
		}
	</script>
</body>
</html>