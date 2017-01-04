
  var init={A:3, periodoEspacial:3, T:5, t:0, x: 0};

	var onda = new OndaArmonica(init);
  onda.x=0;
	//********************************

  function mi_resize( e ) {
   return ( e );
  }

  function mi_click ( m ) {

      console.log('click');
  }

  function mipaint( e ) {
      var ctx = e.context;
      //var xMax=e.pconfig.xMax;
      var tMax=e.xMax;
      ctx.beginPath();

      //ctx.lineCap='bevel';
      //ctx.lineJoin= //'round' || 'bevel' || 'miter'
      //ctx.lineJoin= 'round';
      //ctx.lineCap='round';
      onda.t=0;
      ctx.moveTo( 0, 0 );
      ctx.strokeStyle = 'rgba(250, 128, 114,.5)';
      ctx.lineWidth=4;
      var t=0;
      var dt = 0.05;
      for (t = 0; t <= tMax; ){
        onda.t =t;//.toFixed(2);
        ctx.lineTo( t * e.fsHorizontal,  (onda.y ) * e.fsVertical );
        t = t + dt;

        }

      ctx.stroke();
      ctx.closePath();
    //  Dibujamos mas marcas de los periodos
      for (n = 1; (n * onda.T) <= tMax; n++  ){
        ctx.beginPath();
            ctx.strokeStyle = 'rgba(170, 66, 47,.8)';
            ctx.fillStyle = 'salmon';
            ctx.arc(n * onda.T * e.fsHorizontal, 0, 5,0,2*Math.PI ,false);
            //ctx.stroke();
            ctx.fill();
        ctx.closePath();
      }

  }


    var opciones = { idcontainer: 'contenedor-ejes',
                     width: 0.90,
                     height:240,
                     idcanvas: 'Lienzo',
                     resize: mi_resize,
                     click: mi_click,
                     paint: mipaint,
                     mouseout:5,
                     yMax:3,
                     yCaption: 'y(m)',
                     xCaption: 't(s)',
                     xMax: 10
                    }



    //var grafica = new Plot( opciones );
    Plot.init(opciones);

    var u = [1,2,3,4,5];
    var v= u.map(function(value, index, array){
      console.log(value, index, array);
      return 2 * value; 
    });