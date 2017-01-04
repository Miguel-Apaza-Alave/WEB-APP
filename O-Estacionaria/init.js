  var onda_config={A:3 ,n:3 ,L:6, tension:1, densidad:0.1};
  //var Estacionaria
  var onda=new OndaEstacionaria( onda_config);



function mi_resize(e) {
    return (e);
}


  var t=0;

  var loop=0;
  var fps=40;
  var dt=1/fps;

  function mi_click ( m ) {
    var intervalo=1000/fps;
          
          if ( loop == 0 ) {
            loop = setInterval( function(){
              onda.t = t;
              t = t + dt;
              plot.Repaint();
              //console.log(t);
            }, intervalo ); 
             console.log('iniciar');
          }
          else {
            clearInterval( loop );
            loop = 0;
            console.log('detener');
          }
  }



function mipaint(e) {
    var ctx = e.context;
    ctx.beginPath();
    var fsHorizontal = e.fsHorizontal;
    var fsVertical = e.fsVertical;
   
    var i;
    //  Se dibuja la cuerda con 30 puntos Jajaja Jaja Ja.
    var dx=onda.L/30;
    var L=onda.L;// + 0.1;
    var x=0;
    ctx.beginPath();
    ctx.lineWidth = onda.densidad * 11;
    ctx.strokeStyle = 'rgba(238, 110, 115,.5)';
    
    ctx.moveTo(0,0);    
    onda.x=0;
    for ( x = 0; Math.round(x) <= L ;){
      y=onda.y;  
      ctx.lineTo(x * fsHorizontal, y * fsVertical);
      x = x + dx;
      onda.x = x;     
    }

    ctx.stroke();
    ctx.closePath();
    //console.log(fsHorizontal,fsVertical,ctx);       
   /*
        var _nodos=this._onda.nodos;
        
        //  si es necesario se dibujan los nodos
        if (this._nodosVisibles==true){ 
          for (i=0;i<=_nodos.length;i++){
            ctx.beginPath();  
            ctx.arc(fs*_nodos[i], 0, (fs/20),0,2*Math.PI ,false); 
            ctx.stroke();
            ctx.fill(); 
          }
        } */
}

var opciones = {
    idcontainer: 'contenedor-ejes',
    width: 0.9,
    height: 250,
    idcanvas: 'Lienzo',
    resize: mi_resize,
    click: mi_click,
    paint: mipaint,
    mouseout: 5,
    yMax: 4,
    yCaption: 'v(s)',
    xCaption: 'x(m)',
    xMax: 6
}

var plot = new Plot(opciones);

//***********************************************************
    var str='Nombre de los objetos del programa\n'+
    		'==================================\n'+
    		'Estacionaria' + '\n' +
    		'plot_Estacionaria';	
	console.log(str);

	//	Al hacer click sobre el menú amburguesa se actualizarán
	//	los valores del menú móvil 
    var menu_Movil=document.getElementById('menu-movil');
    menu_Movil.addEventListener('click',Actualizar_Menu_Movil);
    //***

    // Al hacer click sobre el <canvas> se inicia la animación
    var boton=document.getElementById("lienzo");



     var lie=document.getElementById('Lienzo');
 lie.addEventListener('click',mi_click);
    //boton.addEventListener("click",function(){animate.Play(); },false);
	//***
	//var plot_Estacionaria=new PlotOndaEstacionaria('lienzo',Estacionaria,0,undefined,50);
	//plot_Estacionaria.AutoResize();
	//plot_Estacionaria.Dibujar();
	//var fps=50;
	//var animate=new Animate(plot_Estacionaria,fps);

    /***
    *	Menu_Movil: copia los parámetros de la onda estacionaria
    *	al menú móvil.
    */
    function Actualizar_Menu_Movil(){
      var tension=onda.tension;
      var densidad=onda.densidad;
      var _n=onda.n;
      //Tension.noUiSlider.set(tension);
      //Densidad.noUiSlider.set(densidad);
      n.noUiSlider.set(_n); 
    }