
//**************************************************************
    var DOM = (function(){
       
        var leerNodo = function(id) {
            return document.getElementById(id);
        };
     
        var agregardiv = function(o){
            var nodo;
            nodo = document.createElement('div');

            if (o.className !== undefined) {
                nodo.className = o.className;
            }

            if (o.id !== undefined) {
                nodo.setAttribute('id', o.id);
            }
            return nodo;
            //- - -
        };

        return{
             addDiv : agregardiv,
             getNode: leerNodo
        };

    })();    

    var Cartesiano=Object;


    function EjeOrdenadas(config){

        (function init(config) {
            var contenedor_ejes,
                eje_y,
                y,
                yMax;

            yMax = config.yMax;
            contenedor_ejes = document.getElementById(config.idcontainer);
            eje_y = inyectarElementos(config);
            for (y = yMax; y >= -yMax; y--) {
                eje_y.appendChild(Additem(y));
            }
        })(config);

        function inyectarElementos(opciones) {
            var contenedor_ejes,
                capa_y,
                eje_y,
                capa_linea_y,
                eje_y_caption,
                y_caption;

            contenedor_ejes = DOM.getNode(opciones.idcontainer);
            capa_y = DOM.addDiv({
                className: 'capa-y',
                id: 'capa-y'
            });
            eje_y = DOM.addDiv({
                className: 'eje-y'
            });

            capa_y.appendChild(eje_y);
            contenedor_ejes.appendChild(capa_y);
            capa_linea_y = DOM.addDiv({
                id: 'capa-linea-y',
                className: 'capa-linea-y'
            });

            contenedor_ejes.appendChild(capa_linea_y);
            eje_y_caption = DOM.addDiv({
                className: 'eje-y-caption'
            });

            y_caption = document.createTextNode('\u00a0\u00a0' + opciones.yCaption);
            eje_y_caption.appendChild(y_caption);
            capa_linea_y.appendChild(eje_y_caption);
            contenedor_ejes.appendChild(capa_linea_y);
            return eje_y;
        }

        function Additem(ordenada) {
            var item_y,
                y,
                marca_y;

            item_y = DOM.addDiv({
                className: 'item-y'
            });

                y = document.createTextNode(ordenada);
                marca_y = DOM.addDiv({
                    className: 'marca-y'
                });
            item_y.appendChild(y);
            item_y.appendChild(marca_y);
            return item_y;
        }
    }




   //*******************************************************************************
   var Plot = {};
    /**
     * Represents a book.
     * @constructor
     * @param {object} config - The title of the book.
     * @param {object} that - The author of the book.
     */
    // function EjeAbscisas(config) {

    Plot.EjeAbscisas = function(config) {
        
        (function init(config) {
            var eje_x,
                x,
                xMax;

            xMax = config.xMax;
            eje_x = inyectarElementos(config);
            eje_x.appendChild(Additem('\u00a0'));
            for (x = 1; x <= xMax; x++) {
                eje_x.appendChild(Additem(x));
            }
        })(config);



        this.xMax = function(){
            var eje_x = ejex();
            var nCount = eje_x.childElementCount; 
            return (nCount-1);
        };

        this.AgregarItem = function(){
            var eje_x=ejex();
            var nitems=eje_x.childElementCount;
            var item = Additem(nitems);
            eje_x.appendChild(item);
        };

        this.RemoverItem = function(){
            var contenedor_ejes,
                nodo,
                capa_x,
                eje_x,
                item_x,
                nelements;

            eje_x=ejex();
          
        
            //  Se obtiene una referencia al último elemento
            item_x = eje_x.lastElementChild;
            //  Se elimina el item del Dom
            eje_x.removeChild(item_x);
            

            return nelements;
        };   



        function inyectarElementos(config) {
            var contenedor_ejes,
                capa_x,
                eje_x,
                capa_linea_x,
                contenedor_linea_x,
                eje_x_caption,
                x_caption;

            contenedor_ejes = document.getElementById(config.idcontainer);
            
                capa_x = DOM.addDiv({
                    id: 'capa-x',
                    className: 'capa-x'
                });
                
                    eje_x = DOM.addDiv({

                        className: 'eje-x'
                    });

                capa_x.appendChild(eje_x);
            contenedor_ejes.appendChild(capa_x);

                //
                    capa_linea_x = DOM.addDiv({
                        id: 'capa-linea-x',
                        className: 'capa-linea-x'
                    });

                        contenedor_linea_x = DOM.addDiv({
                            className: 'contenedor-linea-x'
                        });

                            eje_x_caption = DOM.addDiv({
                                className: 'eje-x-caption'
                            });
                            
                                x_caption = document.createTextNode(config.xCaption + '\u00a0');
                    
                            eje_x_caption.appendChild(x_caption);
                        contenedor_linea_x.appendChild(eje_x_caption);
                    capa_linea_x.appendChild(contenedor_linea_x);

            contenedor_ejes.appendChild(capa_linea_x);
            return eje_x;
        }


        //  Crea un nuevo item y debuelve una referencia éste.
        function Additem(item) {
            var item_x,
                x,
                xvalue,
                marca_x;

            item_x = document.createElement('div');
            item_x.className = 'item-x';
            x = document.createElement('div');
            marca_x = document.createElement('div');
            marca_x.className = 'marca-x';
            xvalue = document.createTextNode(item);
            x.appendChild(marca_x);
            x.appendChild(xvalue);
            item_x.appendChild(x);

            return item_x;
        }
    /**
     * Represents a book.
     * @función Debuelve una referencia al item ejex
     * @param {object} config - The title of the book.
     * @param {object} that - The author of the book.
     */

        function ejex(){
            var contenedor_ejes,
                nodo,
                capa_x,
                eje_x,
                item_x;

            contenedor_ejes = document.getElementById(config.idcontainer);
            nodo = contenedor_ejes.firstElementChild;
            nodo = nodo.nextElementSibling;
            capa_x = nodo.nextElementSibling;
            eje_x = capa_x.firstElementChild;
            return eje_x;
        }
      
    };


    //*****************************************************
    function Eje(x,y){
        this.ordenadas = y;
        this.abscisas = x;
    }

    //*****************************************************
   

   



Plot.events = {draw: undefined, click: undefined, mouseMove: undefined};
//Plot.config = Object;
Plot.init = function(_config){

        var config = _config;

        var g = {};
        //var CalcularDimensiones=Calcular_Dimensiones;        
        var eje = init(_config);

   
    this.RemoverAbscisa = function(){
        if (eje !== undefined){
            //eje.ejeAbscisas.RemoverItem();
            eje.ejeAbscisas.RemoverItem();
            //  actualizamos el número de elementos del eje x   
            config.xMax = eje.ejeAbscisas.xMax();
            Resize(config); 

        }

    };

    this.AgregarAbscisa = function(){
        if (eje !== undefined){
            //eje.ejeAbscisas.RemoverItem();
            eje.ejeAbscisas.AgregarItem();
            //  actualizamos el número de elementos del eje x   
            config.xMax = eje.ejeAbscisas.xMax();
            Resize(config); 

        }

    };

    this.Repaint = function() {
        var altura;

            //  Se limpia el área de dibujo
            altura=g.lienzo.height/2;
            g.context.clearRect(0,altura,g.lienzo.width, - 2 * altura);
            
            //  Se lanza el evento paint(); 
            config.paint(g);
    };

    function plotClick( event){
           config.click(g, event);
    }

    function MouseEvent (event) {
        console.log(event.type);
    }




    function Resize(config) {
        var lienzo = document.getElementById(config.idcanvas);
        var dimension,
            fs_Horizontal,
            fs_Vertical;
               
        dimension = CalcularDimensiones(config);   // Calula las nuevas dimensiones del lienzo 

        // contenedor_ejes es forzado a tener el mismo alto que el lienzo    
        var contenedor_ejes = document.getElementById(config.idcontainer);
        contenedor_ejes.style.height = dimension.height + 'px';

        // Se redimensiona el canvas
        lienzo.width = dimension.width ;
        if (window.innerWidth > 991){
           lienzo.width = dimension.width  - 260;
        }
        lienzo.height = dimension.height ;

        // se configura el contexto y se aplica una transformación de coordenadas 
        var ctx = lienzo.getContext('2d');
        ctx.translate(0, lienzo.height / 2);
        ctx.transform(1, 0, 0, -1, 0, 0);

        // Se definen el valor de los factores de escala horizontal y vertical
        if (typeof(config.xMax) == 'number'){
            fs_Horizontal = (lienzo.width ) / config.xMax;
            fs_Vertical = (dimension.height - 16) / (2 * config.yMax);  
        }
        
        // Se actualiza el objeto g        
        g = {context: ctx, fsHorizontal:fs_Horizontal, fsVertical: fs_Vertical,
            xMax: config.xMax, yMax: config.yMax, lienzo:lienzo }; 
      
        // Se lanza el evento paint(g) ;              
        if (config.paint !== undefined) {
            config.paint(g);
        }        
    }

 

   function CalcularDimensiones(config){
        var dimension,
            ancho,
            alto;

            if (config.width !== undefined) {
                //   $EJE_Y_ANCHO:4em   nota: ( 4 * 16 ) == 4em                 
                ancho = (document.body.clientWidth * config.width) - (4 * 16) - 8;
            //ancho = (window.innerWidth * config.width) - (4 * 16) - 8; 
            }

            if (config.height !== undefined) {

                if (typeof(config.height) == 'number') {
                    alto = config.height;
                }
            }
 
        if (config.resize !== undefined) {
            
            dimension = config.resize({
                width: ancho,
                height: alto
            });
        } else {


            dimension = {
                width: ancho,
                height: alto
            };
        }

        return dimension;
    }

    function init(config) {
        var that=this;
        var contenedor_ejes,
            lienzo,
            margenleft,
            eje_Ordenadas,
            eje_Abscisas;

        //  Se le da un margin-left al contenedor principal    
        contenedor_ejes = document.getElementById(config.idcontainer);
        contenedor_ejes.className = 'contenedor-ejes';
        //margenleft = (1 - config.width) * 100 / 2;
        //contenedor_ejes.style.marginLeft = margenleft + '%';
        //contenedor_ejes.style.marginRight=margenleft + '%';

        //  Se agregan los ejes coordenados
        eje_Ordenadas = new EjeOrdenadas(config);
        eje_Abscisas = Plot.EjeAbscisas(config);//new EjeAbscisas(config);
        //ejes = new Eje(ejeAbscisas,ejeOrdenadas);
        //  Se configura el canvas
        lienzo = document.createElement('canvas');
        lienzo.setAttribute('id', config.idcanvas);
        lienzo.className='Lienzo';

        //   $EJE_Y_ANCHO:4em   nota: ambas variables tienen que tener el mismo valor
        lienzo.style.marginLeft = '64px';
        //lienzo.style.marginRight = 0;        
        //******************************

        contenedor_ejes.appendChild(lienzo);
        Resize(config);

        //  Evento resize   
        window.addEventListener('resize', function() {
           Resize(config);
        });

        //  Evento click
        if (config.click !== undefined) {
            lienzo.addEventListener('click',plotClick, true);
        }
        if (config.mouseout !== undefined) {
            lienzo.addEventListener('mouseout',MouseEvent, false);
        }
 
        return {ejeAbscisas: eje_Abscisas ,ejeOrdenadas:eje_Ordenadas};
    }


};

