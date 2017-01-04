
	Cartesiano.events.draw=function(g){
		var i;
	
		Vectores.DibujarVector(Vectores.Operacion.datos[0],g);
		if (Vectores.Operacion.datos[1] != undefined){
			Vectores.DibujarVector(Vectores.Operacion.datos[1],g);		
		}

		if ( (Vectores.Operacion.OperacionActual() == 0 ) && (Vectores.Operacion.datos[2] != undefined) ){
			Vectores.DibujarVector(Vectores.Operacion.datos[2],g); //	dibuja el la resultante
		}
 		
	};

	Cartesiano.events.click=function(u){
		Vectores.Operacion.AgregarVector(u);
		Cartesiano.Draw();
		if ( Vectores.Operacion.OperacionActual() == 0 ){
			var idsuma=document.getElementById('suma');
			idsuma.innerText='';
			var u0=document.getElementById('u0');
			var u1=document.getElementById('u1');
			if (Vectores.Operacion.datos[0]!=undefined){
				var u0=document.getElementById('u0');
				u0.innerText='u0 = ' + Vectores.Operacion.datos[0].x + 
				'i +' + Vectores.Operacion.datos[0].y + 'j';
			}

			if (Vectores.Operacion.datos[1]!=undefined){
				var u1=document.getElementById('u1');
				u1.innerText='u1 = ' + Vectores.Operacion.datos[1].x + 
				'i +' + Vectores.Operacion.datos[1].y + 'j';
			}			

		}

		if ( Vectores.Operacion.OperacionActual() == 1 ){
			console.log('click');
			var idponderacion=document.getElementById('ponderacion');
			idponderacion.innerText= Vector.ProductoPunto(Vectores.Operacion.datos[0],Vectores.Operacion.datos[1]);
			var v0=document.getElementById('v0');
			var v1=document.getElementById('v1');
			if (Vectores.Operacion.datos[0]!=undefined){
				var v0=document.getElementById('v0');
				v0.innerText='v0 = ' + Vectores.Operacion.datos[0].x + 
				'i +' + Vectores.Operacion.datos[0].y + 'j';
			}

			if (Vectores.Operacion.datos[1]!=undefined){
				var v1=document.getElementById('v1');
				v1.innerText='v1 = ' + Vectores.Operacion.datos[1].x + 
				'i +' + Vectores.Operacion.datos[1].y + 'j';
			}			

		}


	}

	var Vectores = Object;

	Vectores.DibujarVector=function(r,g){
		if (r !=undefined){
	    	var ctx=g.Context;
	    	var fs=g.fs;	 
	        var rx = fs.Horizontal * r.x;
	        var ry =fs.Vertical * r.y;
	  
	        var angulo_r = Vector.Angulo(r);
	     
	        //this.context.lineJoin = 'round';//'miter|round|bevel';    
	        ctx.lineWidth = r.anchoVector;
	        ctx.lineCap = 'round'; //|round||miter||bevel|
	        ctx.fillStyle = r.colorVector;
	        ctx.strokeStyle = r.colorVector;
	        ctx.beginPath();
	        ctx.moveTo(0, 0);
	        ctx.lineTo(rx, ry); //dibuja el módulo del vector

	        ctx.stroke();
	        ctx.closePath();
	        //var b=8; Tamaño de la punta del vector, medido en px

	        //var a1=3*Math.PI/4+angulo_u; 
	        var a1 = 2.3562 + angulo_r;
	    
	        //var a2=5*Math.PI/4+angulo_u; 
	        var a2 = -2.3562 + angulo_r;

	        var x1 = 8 * Math.cos(a1);
	        var y1 = 8 * Math.sin(a1);
	        var x2 = 8 * Math.cos(a2);
	        var y2 = 8 * Math.sin(a2);

	        ctx.beginPath();
	        ctx.moveTo(rx, ry);

	        ctx.lineTo(x1 + rx, y1 + ry);
	        ctx.lineTo(x2 + rx, y2 + ry);

	        ctx.lineTo(rx, ry);

	        ctx.stroke();
	        ctx.fill();
	        ctx.closePath();
	    }    
	}

	Vectores.Operacion=(function(){
		var 
			s = new Vector(1,1),
			w = new Vector(1,1),
			vectores = new Array(),
			id=0,
			k = 1,	
			pp = undefined,
			mpe = undefined,
			operacion_Actual=0;	// 0:adición,1: producto punto ,2 multiplicación por un escalar

			function sumar(){
			
				if ((vectores[0]!=undefined ) && (vectores[1]!=undefined)){
					s = Vector.Sumar(vectores[0],vectores[1]);			
					s.colorVector='red';			
					vectores[2]=s;
					
					var idsuma=document.getElementById('suma');

					idsuma.innerText = vectores[0].x + 'i + ' + vectores[0].y + 'j';
				}
			}

			function productoPunto(){
				pp = Vector.ProductoPunto(u,v)	
				vectores=new Array(u,v,pp);
				//**************************************************************************************************
				Cartesiano.Draw();
				return 
			}

			function operacionActual(operacion){
				
				if (operacion != undefined){
					operacion_Actual=operacion;
				}
				else{
					return operacion_Actual;
				}
			}

			function agregarVector(u){
				vectores[id++]=u;
				if (id==2){
					id=0;
				}
				vectores[2]=undefined;
				
			}
		return {
			Sumar:sumar,
			ProductoPunto: productoPunto,
			MultiplicacionEscalar: function(k){return w.Multiplicarle(k)},
			datos:vectores,
			AgregarVector: agregarVector,
			OperacionActual:operacionActual
			
		}	
	})();	



	function Sumar(){
		
		Vectores.Operacion.OperacionActual(0);
		Vectores.Operacion.Sumar();
		Cartesiano.Draw();
	}	
		// 
