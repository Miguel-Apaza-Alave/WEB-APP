 


    function mi_resize( e ) {
        console.log('resize');
        console.log(e);
        //e.height=200;
     return ( e );
    }

    function mi_click (g, event ) {
      
        var x = event.offsetX;//event.clientX - event.pageX
        var y = g.lienzo.height / 2 - event.offsetY; //event.clientY 
        var ctx = g.context;
       

        ctx.beginPath();
        ctx.fillStyle ="blue";        
        ctx.arc(x,y,5,0,Math.PI*2,false);
        ctx.fill();
        ctx.closePath();
        
    }

    function mipaint( g ) {
        
        var ctx = g.context;
        
        ctx.beginPath();
      
        ctx.moveTo( 0, 0 );
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(239, 154, 154,.4)';

        ctx.lineTo( 1*g.fsHorizontal, 1 * g.fsVertical );
        ctx.lineTo( 2*g.fsHorizontal, 0 );
        ctx.lineTo( 3*g.fsHorizontal,  2*( 1 * g.fsVertical ) );
        ctx.lineTo( 4*g.fsHorizontal,  0 );
        ctx.lineTo( 5*g.fsHorizontal,  3*( 1 * g.fsVertical ) );
        ctx.lineTo( 6*g.fsHorizontal,  0 );

        ctx.stroke();
        ctx.closePath();
    }                

    Plot.events = {draw: mipaint, click: mi_click, mouseMove: undefined};   
    var opciones = { idcontainer: 'contenedor-ejes',
                     width: 0.9,
                     height: 150,                    
                     idcanvas: 'Lienzo',
                     resize: mi_resize,
                     click: mi_click,
                     paint: mipaint,
                     mouseout:5,
                     yMax:2,
                     yCaption: 'y',
                     xCaption: 'x',
                     xMax: 4
                    }
                   
                 
   //var plot = new Plot( opciones );
   Plot.init(opciones);