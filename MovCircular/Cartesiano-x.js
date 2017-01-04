var DOM =(function ( ) {

    add_Div = function(o) {
        var nodo;
        nodo = document.createElement( 'div' );
                        
        if ( o.className != undefined ){
            nodo.className = o.className;
        }

        if ( o.id != undefined ) {
            nodo.setAttribute( 'id', o.id );
        } 
        return nodo;
    }

    get_Node = function(id){
        return document.getElementById(id);    
    }

    return {addDiv: add_Div, getNode: get_Node}
 })()   

   
    /**
     * Represents a book.
     * @constructor
     * @param {object} config - The title of the book.
     * @param {object} that - The author of the book.
     */


function EjeAbscisas(config) {
    
    EjeAbscisas.init(config);

    //  Entrega una referencia al elemento ejex
    var ejex= function(){
        var contenedor_ejes,
            capa_x,
            eje_x;
           
        contenedor_ejes = document.getElementById(config.idcontainer);
       
       capa_x = contenedor_ejes.firstElementChild;
       eje_x=capa_x.firstElementChild;
        return eje_x
    }

    //***
    
    //this.xMax = -- ejex().childElementCount;
    
    this.xMax =  function(){
            var eje_x = ejex();
            var nCount = eje_x.childElementCount; 
            return (nCount-1);
    }

    //***

    this.AgregarItem = function(){
        var eje_x=ejex();
        var nitems=eje_x.childElementCount;
        var item = EjeAbscisas.Additem(nitems);
        eje_x.appendChild(item);
        //item=document.createElement
    }

    //***

    this.RemoverItem = function(){
        var contenedor_ejes,
            nodo,
            capa_x,
            eje_x,
            item_x;

        eje_x=ejex();
        //  Se obtiene una referencia al último elemento
        item_x = eje_x.lastElementChild;
        //  Se elimina el item del Dom
        eje_x.removeChild(item_x);
    }             
  
  
}

    //  Crea un nuevo item y debuelve una referencia al item creado
    EjeAbscisas.Additem = function(item) {
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

//  Inyecta código HTML al Dom Retorna una referencia el nodo eje-x 
    EjeAbscisas.init = function(config) {
        var contenedor_ejes,
            capa_x,
            eje_x,
            x,
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
                })
                
                //  Agregamos los números y las respectivas marcas del eje
                for (x = 0; x <=  config.xMax; x++) {
                    
                        eje_x.appendChild(EjeAbscisas.Additem(x));
                  
                }
                console.log('x:',x);
                //********************************************************
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
                        
                            x_caption = document.createTextNode(config.xCaption   );
                
                        eje_x_caption.appendChild(x_caption);
                    contenedor_linea_x.appendChild(eje_x_caption);
                capa_linea_x.appendChild(contenedor_linea_x);

        contenedor_ejes.appendChild(capa_linea_x);
        return eje_x;
    }
    //*****************************************************


  
 //*****************************************************
   
    /**
     * Represents a book.
     * @constructor
     * @param {object} config - The title of the book.
     * @param {object} that - The author of the book.
     */

function Plot(config){
    
    var g = {};
    //this.eje = new Eje();
    var  ejeAbscisas;

    init(config);
  
    //  Inicialmente this.config.xMax es un número,
    //  luego es una función
    //this.config.xMax = this.eje.abscisas.xMax;   
   
    this.RemoverAbscisa = function(){
        ejeAbscisas.RemoverItem();
        config.xMax = ejeAbscisas.xMax();
        Resize(config); 
        this.Repaint();
    }

    this.AgregarAbscisa = function(){
        ejeAbscisas.AgregarItem();
        config.xMax = ejeAbscisas.xMax();
        Resize(config);         
        this.Repaint();
    }


    function MouseEvent(event) {
        //if(event.type == 'click' ){
        console.log(event.type);
    }

    function CalcularDimensiones(config){
        var dimension,
            ancho,
            alto;

        if (config.width != undefined) {
            //   $EJE_Y_ANCHO:4em   nota: ( 4 * 16 ) == 4em                 
            ancho = config.width;//(document.body.clientWidth * config.width) ;//- (4 * 16);
            //ancho = (window.innerWidth * config.width)
        }

        if (config.height != undefined) {

            if (typeof(config.height) == 'string') {

                if (config.height.search('px') != -1) {
                    var str = config.height;
                    var strsize = str.length;
                    alto = str.substr(0, strsize - 2) * 1;
                }

                if (config.height.search('%') != -1) {
                    alto = config.height.substr(0, config.height.lenght - 1) * 1;
                }

            }

            if (typeof(config.height) == 'number') {
                alto = config.height;
            }
        }

        if (config.resizeFunction != undefined) {
            dimension = config.resize({
                width: 300,
                height: 300
            });
        } else {
            dimension = {
                width: 300,
                height: 300
            };
        }

        return dimension
    }


    function Resize(config) {
        var lienzo = document.getElementById(config.idcanvas);

        var dimension,
            fs_Horizontal,
            fs_Vertical;

        //  Calula las nuevas dimensiones del lienzo        
        dimension=CalcularDimensiones(config);

        //  contenedor_ejes es forzado a tener el mismo alto que el lienzo    
        var contenedor_ejes = document.getElementById(config.idcontainer);
        contenedor_ejes.style.height = dimension.height + 'px';


        //  Se redimensiona el canvas
        //  ancho de contenedor-ejes - $CANVAS_MARGEN 
        lienzo.width = dimension.width - 3 * 16;

        lienzo.height = dimension.height;

        //  configuramos el contexto
        var ctx = lienzo.getContext('2d');
        ctx.translate(lienzo.width / 2, lienzo.height / 2);
        ctx.transform(1, 0, 0, -1, 0, 0);

        //  es necesario parametrizar 8 y 16
        //  Definimos el valor de los factores de escala
        //  
        //if (typeof(config.xMax) == 'number'){
    
        if (ejeAbscisas != undefined){
            fs_Horizontal = (lienzo.width) / config.xMax;
            fs_Vertical = (lienzo.height - 16) / (2 * config.yMax);
            g.xMax = config.xMax;
        }
        else{
            fs_Horizontal = (dimension.width - 8) / ejeAbscisas.xMax;
            fs_Vertical = (dimension.height - 16) / (2 * config.yMax);
            g.xMax = ejeAbscisas.xMax;
            //console.log('f',eje.abscisas.xMax);            
        }
         
        g.context= ctx;
        g.fsHorizontal = fs_Horizontal/2;
        g.fsVertical = fs_Vertical; 
        g.yMax = config.yMax;

        //  Se lanza el evento paint();              
        if (config.paint != undefined) {

            config.paint(g);
        }
    }

 
    this.Repaint=function() {

            Resize(config);
       
        /*if ( this.config.paint != undefined ) {
            var g=this.g;   
             this.config.paint( g );
        }*/
    }


    function init(config ) {
        var contenedor_ejes,
            lienzo,
            margenleft,
            ejeOrdenadas;

        //  Se le da un margin-left al contenedor principal    
        contenedor_ejes = document.getElementById(config.idcontainer);
        contenedor_ejes.className = 'contenedor-ejes ';  //****************************************************************
        //margenleft = (1 - config.width) * 100 / 2;
        //contenedor_ejes.style.marginLeft = margenleft + '%';
        //contenedor_ejes.style.marginRight = margenleft + '%';
        //  Se agregan los ejes coordenados
        //ejeOrdenadas = new EjeOrdenadas(config);
        ejeAbscisas = new EjeAbscisas(config);
        

        //  Se configura el canvas
        lienzo = document.createElement('canvas');
        lienzo.setAttribute('id', config.idcanvas);
        lienzo.className='Lienzo';
      //    $CANVAS_MARGEN:1.5em   nota: ambas variables tienen que tener el mismo valor
           // lienzo.style.marginLeft = '1.5em';
           // lienzo.style.marginRight = '1.5em';
            //******************************

        contenedor_ejes.appendChild(lienzo);
       
        Resize(config);
       

        //  Evento resize   
        window.addEventListener('resize', function() {
            Resize(config);
        });

        //  Evento click
        if (config.click != undefined) {
            lienzo.addEventListener('click', config.click, false);
        }
        if (config.mouseout != undefined) {
            lienzo.addEventListener('mouseout', MouseEvent, false);
        }
        
    }

    
}

