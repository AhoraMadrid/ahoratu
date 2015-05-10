tiempo_trigger=5;
tiempo_detectando=0;
tiempo_inicio=-1;
limpiar=true;

$(function() {
	$('#defaultCanvas').appendTo('.container')

	$('#captura-btn').on('click',function(){
		
		var video = document.getElementById('video');
		var ctx = document.getElementById('canvas').getContext('2d');
		console.log("captura" + x1 + " " + y1 + " " + w1 + " " + h1 + "video" +  video.width + " " +  video.height)
		limpiar=!limpiar;
		if(!limpiar) trackerTask.stop(); else trackerTask.run();

		//ctx.drawImage(video, 0, 0);
		//var img = new Image();
		//img.src = "html5.gif"
		//img.onload = function () {
			var canvas= document.getElementById('canvas')
		context.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(video,x1*2-40,y1*2-40,w1*2+80,h1*2+80,0,0,w1*2,h1*2);
		dataURL = document.getElementById('canvas').toDataURL();
		   setup();
		//}
	});
	
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      trackerTask=tracking.track('#video', tracker, { camera: true });

      tracker.on('track', function(event) {
      	
        if(limpiar) context.clearRect(0, 0, canvas.width, canvas.height);
             if (event.data.length === 0) {
             	status='waiting'
              $('#texto-ayuda').empty().html('No te vemos delante de la pantalla. <br/> Tienes que mejorar un poco tu iluminación')
              tiempo_detectando=0;
              tiempo_inicio=-1
              detectStatus="waiting"
						
              $('#captura-btn').fadeOut();
            } 
            else{ 
            	//console.log(event);
            	$('#captura-btn').fadeIn();
            $('#texto-ayuda').empty()
            $('#texto-ayuda').empty().html('<h2>Tienes algo en la mirada. <br/>Tu cara nos dice que quieres una ciudad más ecológica igualitaria y participativa</h2>') 
	            
	            event.data.forEach(function(rect) {

	            	if(tiempo_inicio==-1){ 	   // primera vez

	            		var d = new Date();
						var n = d.getTime();
						tiempo_inicio=n;
						detectStatus="face"
						animatebars();
						
	            	}
	            	else{
	            		var d = new Date();
						var n = d.getTime();
	            		tiempo_detectando=n-tiempo_inicio;
	            		$('#contador span').empty().html(tiempo_detectando);
	            	}
	            	x1=rect.x; 
	            	y1=rect.y; 
	            	w1=rect.width; 
	            	h1=rect.height;
		            context.strokeStyle = '#a64ceb';
		            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
		            context.strokeRect(rect.x+rect.width/4, rect.y+rect.height/4, 20, 10);
		            context.strokeRect(rect.x+2*rect.width/4, rect.y+rect.height/4, 20, 10);
		            context.font = '11px Helvetica';
		            context.fillStyle = "#fff";
		            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
		            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
	            });
	        }
        });
      

      /*var gui = new dat.GUI();
      gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
      gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
      gui.add(tracker, 'stepSize', 1, 5).step(0.1);*/
    


// create an new instance of a pixi stage
});

function sequenceDetection(){
	// primero detecta cara: 1 potencial votante detectado

	// 2º detecta un ojo. Msg 1. Comianza animacion

}
//waiting, face
var detectStatus='waiting'

var appStatus;
function animatebars(){
	$('#bar1').css('width',Math.random()*60+40+'px');
	$('#bar2').css('width',Math.random()*60+40+'px');
	$('#bar3').css('width',Math.random()*60+40+'px');
	if(detectStatus=='face'){
		setTimeout(animatebars,500);
	}else{
		$('.bars').css('width','0px');
	}
}

