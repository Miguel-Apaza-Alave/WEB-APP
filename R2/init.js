	
	var Ejes=function(config){
		var contenedor_ejes = document.getElementById(config.id_raiz);
		//var nodo = {type: 'div', id: undefined, className: 'capa', TextNode: undefined, item: undefined };
		contenedor_ejes.className='contenedor-ejes';
		//contenedor_ejes.setAttribute('width', Cartesiano.config.width + 'px');
		contenedor_ejes.setAttribute('height', Cartesiano.config.height + 'px');
		//AgregarNodo(nodo);

		(function capa_abscisas(item){
			var nodo = {type: 'div', className:'capa-abscisas'}
			item.appendChild( AgregarNodo(nodo) );

			(function item_abscisa(item){
				var nodo = {type: 'div', className: 'item-abscisa' };
				var i;
				for ( i=-config.n_abscisas; i<= config.n_abscisas; ++i){
					item.appendChild(AgregarNodo(nodo));
				}
			})(nodo.item); 

		})(contenedor_ejes);


		(function capa_ordenadas(item){
			var nodo = {type: 'div', className:'capa-ordenadas'}
			item.appendChild( AgregarNodo(nodo) );

			(function item_ordenada(item){
				var nodo = {type: 'div', className: 'item-ordenada'};
				var i;
				for ( i=-config.n_ordenadas; i<= config.n_ordenadas; ++i){
					item.appendChild(AgregarNodo(nodo));
				}	
			})(nodo.item); 

		})(contenedor_ejes);


		(function capa_eje_x(item){
			var nodo = {type: 'div', className:'capa-eje-x'}
			item.appendChild( AgregarNodo(nodo) );

			(function eje_x(item){
				var nodo = {type: 'div', className: 'eje-x'};
				
				item.appendChild( AgregarNodo(nodo) );

				(function x(item){
					var nodo = {type: 'div', className:'x', TextNode: undefined };
					var i;

					for ( i=-config.n_abscisas; i<= config.n_abscisas; ++i){
						nodo.TextNode=i;
						item.appendChild(AgregarNodo(nodo));
					}				
				})(nodo.item);

			})(nodo.item); 

		})(contenedor_ejes);

		/**************************************************************************************/


		(function capa_eje_y(item){
			var nodo = {type: 'div', className:'capa-eje-y'}
			item.appendChild( AgregarNodo(nodo) );

			(function eje_y(item){
				var nodo = {type: 'div', className: 'eje-y'};
				
				item.appendChild( AgregarNodo(nodo) );

				(function y(item){
					var nodo = {type: 'div', className:'y', TextNode: undefined };
					var i;

					for ( i=config.n_ordenadas; i>= -config.n_ordenadas; --i){
						nodo.TextNode = i || undefined;

						item.appendChild(AgregarNodo(nodo));
					}				
				})(nodo.item);

			})(nodo.item); 

		})(contenedor_ejes);		

		/**/
		(function capa_lienzo(item){
			var nodo = {type: 'div', className: 'capa-lienzo' };
			item.appendChild( AgregarNodo(nodo) );

			(function lienzo(item){
				var nodo = {type: 'canvas',id:config.id_lienzo, className: 'lienzo' };
				item.appendChild(AgregarNodo(nodo));
			})(nodo.item);

		})(contenedor_ejes)
		/**/
		function AgregarNodo(node){
			var element,TextNode;

			if (node.type != undefined){
				element = document.createElement(node.type);
			}

			if (node.id != undefined){
				element.setAttribute('id',node.id);
			}

			if ( node.className != undefined){
				element.className = node.className;
			}

			if ( node.TextNode != undefined){
				TextNode=document.createTextNode(node.TextNode);
				element.appendChild(TextNode);
			}
						
			node.item = element;
			return element;
		}
	}


	//*******************************************************************************************************       


	var Cartesiano = Object;
	Cartesiano.config = { id_raiz:'contenedor-ejes' ,width:0.9 ,height:300, id_lienzo:'lienzo', n_abscisas:6, n_ordenadas:5};
	Cartesiano.events = {draw: undefined, click: undefined, mouseMove: undefined};
	//Catesiano.Eje.


	Cartesiano.init = (function(){

		var g=Object,
			ejes = new Ejes(Cartesiano.config),
			id_lienzo = Cartesiano.config.id_lienzo,
			canvas = document.getElementById(id_lienzo),
			ctx = canvas.getContext('2d');

		resize();

		window.addEventListener('resize', resize);
		canvas.addEventListener('click',mouse_click);

		function resize(){
			var 				
				width = document.body.clientWidth * Cartesiano.config.width,
				_fs=Object;
			canvas.width= width - 2*16;
			canvas.height=Cartesiano.config.height - 2*16;			
	        ctx.translate(lienzo.width / 2, lienzo.height / 2);
	        ctx.transform(1, 0, 0, -1, 0, 0);
	        
	        _fs.Horizontal = lienzo.width / (2 * Cartesiano.config.n_abscisas);
	        _fs.Vertical = lienzo.height / (2 * Cartesiano.config.n_ordenadas);
	        var _plot={ width: canvas.width, height: canvas.height }
	        g = {lienzo:canvas, Context: ctx, fs: _fs, plot: _plot};

	        if (Cartesiano.events.draw != undefined){
	        	Cartesiano.events.draw(g);
	        }

		}

		function mouse_click(event) {
	        var area = g.plot;
	     
	        var body_width = document.body.clientWidth;
	   		var ancho = body_width * 0.05;
	        
 			var x = (  event.offsetX - g.lienzo.width / 2 ) / g.fs.Horizontal;//event.clientX - event.pageX
        	var y = ( g.lienzo.height / 2 - event.offsetY ) / g.fs.Vertical; //event.clientY 
        	

	        //var x = ( event.clientX - ancho - 16 - (area.width / 2) ) / g.fs.Horizontal;
	        //var y = -(event.clientY - 2*16 - (area.height / 2)) / g.fs.Vertical;

	        x = Math.round(x);
	        y = Math.round(y);
	
	       
	        var u = new Vector( x, y ); 
	        if (Cartesiano.events.click != undefined){
				Cartesiano.events.click(u);
			}

	    }
	    
	    function draw(){
	    	if (Cartesiano.events.draw != undefined){
	    		resize();
	        	Cartesiano.events.draw(g);
	        }
	    }

	    return {
	    	Redraw:draw
	    }

	})();

	Cartesiano.Draw=Cartesiano.init.Redraw;


		