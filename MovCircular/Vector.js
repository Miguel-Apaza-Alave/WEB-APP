  /***
  *		28/05/16	Se eliminan los métodos para representar los vectores de manera gráfica 
  *		04/06/16	Se agregan los métodos: ProductoPunto, Normal, Rotar, ProductoCruz y Ángulo.
  *		06/06/16	Se realiza un testeo a la librería, cuyo objetivo es encontrar posibles bugs
  *		07/06/16	Se han eliminado todos los bugs conocidos. 
  *		03/07/16	Se optimiza el método ángulo. 
  *		15/12/16	Se corrige el método clonar.		
  */

	function Vector( x, y, z ) {
		
		this.x = x;
		this.y = y;
		this.z = z || 0;
		this.id = undefined;	//Propiedad obsoleta
		this.tag = undefined;	//Propiedad obsooleta
		this.anchoVector = 1;
		this.colorVector = 'rgba(33, 150, 243,.5)';
		 
	}

	// Métodos públicos
	Vector.prototype = {
	
		get modulo() {
			return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
		},
		
		get magnitud() {
			return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		}, 

		/*====================  Métodos  ====================*/
		Clonar: function() {
			var u
			//Realmente no clona. Es necesario reescribir este método. 
			return new Vector( this.x, this.y, this.z );	
		},
		
		Normalizar: function() {
			var longitud = this.magnitud;
			
			if ( longitud > 0 ) {
				this.x = this.x / longitud;
				this.y = this.y / longitud;
				this.z = this.z / longitud;
			}
		},
		
		Sumarle: function( u ) {
			this.x = this.x + u.x;
			this.y = this.y + u.y;
			this.z = this.z + u.z;
		},

		Restarle: function( u ) {
			this.x = this.x - u.x;
			this.y = this.y - u.y;
			this.z = this.z - u.z;
		},
		
		Multiplicarle: function( k ) {
			this.x = k * this.x;
			this.y = k * this.y;
			this.z = k * this.z;
		}	
	};
	
	/*====================  Métodos Estáticos ====================*/
	Vector.Sumar = function() {
		var x, y, z;
		var i;
		var r;

		var nVectores = arguments.length;
		x= y = z = 0;		
		for( i = 0; i < nVectores; i++ ) {
			r = arguments[i];
			x = x + r.x;
			y = y + r.y;
			z = z + r.z;
		}
		return new Vector( x, y, z );
	}
	
	Vector.ProductoPunto = function( u, v ) {		
		return ( u.x * v.x + u.y * v.y );
	}


	Vector.ProductoCruz = function( u, v ) {
		var i = u.y * v.z - u.z * v.y;
		var j = -(u.x * v.z - u.z * v.x);
		var k = u.x * v.y - u.y * v.x;
		return new Vector( i, j ,k );	
	}

	Vector.Rotar = function( u, angulo ) {
			var u_modulo = u.modulo;
			var u_angulo = Vector.Angulo( u );
			u.x = u_modulo * Math.cos( u_angulo + angulo );
	    	u.y = u_modulo * Math.sin( u_angulo + angulo );	    	
	}	

	Vector.Normal = function( u ) {
		var modulo = u.modulo;
		var angulo = Vector.Angulo( u );
		var x = modulo * Math.cos( Math.PI / 2 + angulo);
    	var y = modulo * Math.sin( Math.PI / 2 + angulo);
    	return new Vector( x, y ,0 );
	}

	Vector.Angulo = function( u ){
		var angulo;
		var y = u.y;
		var x = u.x;
		

		if (y >= 0) {
			angulo = Math.atan2( y, x );
		}
		else {
			angulo = Math.atan2( y, x ) + 2 * Math.PI;
		}	
		
		return angulo;
	} 

