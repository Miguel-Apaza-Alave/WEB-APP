    function EventosControles() {
        /* var boton=document.getElementById("lienzo");
         boton.addEventListener("click",function(){animate.Play(); },false);
         */
        var Posicion = document.getElementById('cb_posicion');
        var velocidad = document.getElementById('cb_velocidad');
        var aceleracion = document.getElementById('cb_aceleracion');
        var trayectoria = document.getElementById('cb_trayectoria');  
        trayectoria.checked=false;
        Posicion.checked=false;
        var fuerzaCentripeta = document.getElementById('cb_fuerzaCentripeta');                        
        circular.MostrarPosicion = posicion.checked;
      

  
        //inicializamos
        circular.MostrarPosicion = false;//posicion.checked;
        circular.MostrarVelocidad = velocidad.checked;
        circular.MostrarAceleracion = aceleracion.checked;
        circular.MostrarTrayectoria = false;//trayectoria.checked;
        circular.MostrarFuerzaCentripeta = fuerzaCentripeta.checked;
        plot.Repaint();



        Posicion.addEventListener("click", function() {
            circular.MostrarPosicion = Posicion.checked;
            plot.Repaint();

        }, false);

      
        velocidad.addEventListener("click", function() {
            circular.MostrarVelocidad = velocidad.checked;
            plot.Repaint();
        }, false);


        aceleracion.addEventListener("click", function() {
            circular.MostrarAceleracion = aceleracion.checked;
            plot.Repaint();
        }, false);



      
       
        trayectoria.addEventListener("click", function() {
            circular.MostrarTrayectoria = trayectoria.checked;
            plot.Repaint();

        }, false);


        fuerzaCentripeta.addEventListener("click", function() {
            circular.MostrarFuerzaCentripeta = fuerzaCentripeta.checked;

            plot.Repaint();

        }, false);


    }



    var T = 7 //Período temporal    
    var w = (2 * Math.PI) / T; //frecuencia angular
    var fps = 30; //Frames por segundo
    var radio = 6;
    var masa = 1;
    var circular = new MovimientoCircular(radio, w, masa);


    //*************************************************

    function DibujarVector(r, u, g) {
        var _fs = g.fsHorizontal;
        //si el vector u no está definido, entonces dibujamos desde el origen   
        if (typeof(u) == 'undefined') {
            u = r;
            u.colorVector = r.colorVector;
            u.anchoVector = r.anchoVector;
            r = new Vector(0, 0);
           
        }
        var rx_ux = _fs * (r.x + u.x),
            ry_uy = _fs * (r.y + u.y),       
            angulo_u = Vector.Angulo(u),
            ctx = g.context;
  
        ctx.lineWidth = u.anchoVector;
        ctx.lineCap = 'round'; //|round||miter||bevel|
        ctx.fillStyle = u.colorVector;
        ctx.strokeStyle = u.colorVector;
        ctx.beginPath();
        ctx.moveTo(r.x * _fs, r.y * _fs);
        ctx.lineTo(rx_ux, ry_uy); 
        ctx.stroke();   //dibuja el módulo del vector
        
        var a1 = 2.3562 + angulo_u;     //var a1=3*Math.PI/4+angulo_u; 
        var a2 = 3.9270 + angulo_u;     //var a2=5*Math.PI/4+angulo_u;
        var x1 = 8 * Math.cos(a1);      // b=8; Tamaño de la punta del vector
        var y1 = 8 * Math.sin(a1);
        var x2 = 8 * Math.cos(a2);
        var y2 = 8 * Math.sin(a2);

        ctx.beginPath();
        ctx.moveTo(rx_ux, ry_uy);
        ctx.lineTo(x1 + rx_ux, y1 + ry_uy);
        ctx.lineTo(x2 + rx_ux, y2 + ry_uy);
        ctx.lineTo(rx_ux, ry_uy);

        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }


    function mi_resize(e) {
        return (e);
    }

    var t = 0;

    var loop = 0;
    var fps = 40;
    var dt = 1 / fps;

    function mi_click(m) {
        var intervalo = 1000 / fps;

        if (loop == 0) {
            loop = setInterval(function() {
                circular.t(t);
                t = t + dt;
                plot.Repaint();
            }, intervalo);
            console.log('iniciar');
        } else {
            clearInterval(loop);
            loop = 0;
            console.log('detener');
        }
    }

    function mipaint(e) {

        var ctx = e.context;
        ctx.beginPath();


        var r = circular.coordenadas;
               
        var fs = e.fsHorizontal;


        ctx.beginPath();
        ctx.fillStyle = 'rgba( 255, 0, 0, 1)';
        //ctx.arc( 1 * fs, 1 * fs, fs * ( circular.r / 10), 0, 2 * Math.PI , false );
        //ctx.arc( r.x * fs, r.y * fs, fs * ( circular.r / 10), 0, 2 * Math.PI , false );          
        ctx.arc(r.x * fs, r.y * fs, fs * (circular.m), 0, 2 * Math.PI, false);
        ctx.fill();

        if (circular.MostrarPosicion) {
            r.colorVector = 'rgba(238, 110, 115,.5)';
            r.anchoVector =4; 
            DibujarVector(r, undefined, e);
        }

        if (circular.MostrarTrayectoria) {
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'rgba( 255, 0, 0, .2)';
            ctx.arc(0, 0, fs * circular.r, 0, 2 * Math.PI, false);
            ctx.stroke();
        }

        if (circular.MostrarVelocidad) {
            var v = circular.velocidad;
            v.colorVector = 'rgba(0, 111, 188,.8)';
            v.anchoVector = 2;
            DibujarVector(r, v, e);
        }


        if (circular.MostrarFuerzaCentripeta) {
            var fc = circular.fuerzaCentripeta;
            fc.colorVector = 'red';//'rgba(209, 57, 15,.9)';
            DibujarVector(r, fc, e);
        }

        if (circular.MostrarAceleracion) {
            var ac = circular.aceleracionCentripeta;
            ac.colorVector='rgba(0, 128, 64,.8)';
            ac.anchoVector=2;
            //ac.colorVector = 'rgba(209, 57, 15,.9)';
            DibujarVector(r, ac, e);
        }
        actualizarDatos();


    }

    var opciones = {
        idcontainer: 'contenedor-ejes',
        width: 300,
        height: 300,
        idcanvas: 'Lienzo',
        resize: mi_resize,
        click: mi_click,
        paint: mipaint,
        mouseout: 5,
        yMax: 4,
        yCaption: 'v(s)',
        xCaption: 'x(m)',
        xMax: 8
    }




    var plot = new Plot(opciones);
    EventosControles();

    function actualizarDatos() {
        var idList = ['posicion', 'velocidad', 'a_centripeta', 'f_centripeta', 'f_centrifuga'];
        var posicion = (function() {
            var posicion = circular.coordenadas;
            var str = 'Posición r = ' + (posicion.x).toFixed(1) + 'i' + ' + ' + (posicion.y).toFixed(1) + 'j';
            return {
                vector: str,
                modulo: (posicion.modulo).toFixed(2) + '(m)'
            }
        })();

        var velocidad = (function() {
            var v = circular.velocidad;
            var str = 'Velocidad v = ' + (v.x).toFixed(1) + 'i' + ' + ' + (v.y).toFixed(1) + 'j';
            return {
                vector: str,
                modulo: (v.modulo).toFixed(2) + '(m/s)'
            }
        })();

        var ac = (function() {
            var ac = circular.aceleracionCentripeta;
            var str = 'A. centrípeta ac = ' + (ac.x).toFixed(1) + 'i' + ' + ' + (ac.y).toFixed(1) + 'j';
            return {
                vector: str,
                modulo: (ac.modulo).toFixed(2) + '(m/s)'
            }
        })();

        var fc = (function() {
            var fc = circular.fuerzaCentripeta;
            var str = 'F. centrípeta Fc = ' + (fc.x).toFixed(1) + 'i' + ' + ' + (fc.y).toFixed(1) + 'j';
            return {
                vector: str,
                modulo: (fc.modulo).toFixed(2) + '(N)'
            }
        })();

        var elemento;
        var vector = {},
            modulo = {};
        //for(i=0;i<idList.length;i++){
        elemento = document.getElementById('posicion');
        modulo.referencia = elemento.lastElementChild; //elemento.firstElementChild;
        modulo.referencia.innerText = posicion.modulo;
        //modulo.valor=document.createTextNode(text[i] );
        //modulo.referencia.appendChild(modulo.valor);
        //elemento.appendChild(vector.referencia);

        vector.referencia = elemento.firstElementChild;
        vector.referencia.innerText = posicion.vector;
        //vector.valor=document.createTextNode(  'vector');
        //vector.referencia.appendChild(vector.valor);
        //elemento.appendChild(vector.referencia);   


        elemento = document.getElementById('velocidad');
        modulo.referencia = elemento.lastElementChild;
        modulo.referencia.innerText = velocidad.modulo;
        vector.referencia = elemento.firstElementChild;
        vector.referencia.innerText = velocidad.vector;

        elemento = document.getElementById('a_centripeta');
        modulo.referencia = elemento.lastElementChild;
        modulo.referencia.innerText = ac.modulo;
        vector.referencia = elemento.firstElementChild;
        vector.referencia.innerText = ac.vector;

        elemento = document.getElementById('f_centripeta');
        modulo.referencia = elemento.lastElementChild;
        modulo.referencia.innerText = fc.modulo;
        vector.referencia = elemento.firstElementChild;
        vector.referencia.innerText = fc.vector;
    }