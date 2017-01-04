
  var init={A:3, lamda:2, T:5};
   var onda_inicial={a:2, lamda:2, T:2};
  var onda=new OndaArmonica(init.A, init.lamda, init.T);
  onda.x=0; 
  //********************************
  var t=0;

  var loop=0;
  var fps=30;
    var dt=1/fps;
  function mi_click ( m ) {
    var intervalo=1000/fps;
          if ( loop == 0 ) {
            loop = setInterval( function(){
              onda.t = t;
              t = t + dt;
              Plot.Repaint();
            }, intervalo ); 
          }
          else {
            clearInterval( loop );
            loop = 0;
          }
  }

  function mi_resize( e ) {
   return ( e );
  }


  function mipaint( e ) {
      var ctx = e.context;
      var xMax = e.xMax;

      ctx.beginPath();
      onda.x = 0; 
      ctx.moveTo( 0,  onda.y * e.fsVertical );
      ctx.strokeStyle = 'rgba(238, 110, 115,.5)';
      ctx.lineWidth = 5;
      var x = 0;
      var dx = 0.05;
     
      for (x = 0; x <= xMax; ){
        onda.x = x;//.toFixed(2);
        ctx.lineTo( x * e.fsHorizontal,  onda.y * e.fsVertical );
        x = x + dx; 
      }
    
      ctx.stroke();
      ctx.closePath();
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
                     xCaption: 'x(m)',
                     xMax: 10
                    }


    //var grafica = new Plot( opciones );
    Plot.init( opciones );
    /*
var menu_movil=document.getElementById('menu-movil');
  menu_movil.addEventListener('click',menuMovil);

  function menuMovil(){
    var a=onda.A;
    var T=onda.T;
    var periodoEspacial=onda.periodoEspacial;
    amplitud.noUiSlider.set(a);
    periodo_T.noUiSlider.set(T);
    longitud_Onda.noUiSlider.set(periodoEspacial);
  }
*/