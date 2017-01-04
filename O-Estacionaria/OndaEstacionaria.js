	class OndaEstacionaria {
		constructor(config) {

			this.t = 0;
			this.x = 0;
			this.A = config.A;
			this.L = config.L;
			this._n = config.n;
			this.densidad = config.densidad;
			this._v = Math.sqrt(this.tension / this.densidad);
			this.tension = config.tension;
			//**************************************
			//	Se calcula la ubicación de los nodos
			this.x_nodos = [];

			(function init(that){
				var x=0,
					i,
					l = that.L;
								
				for (i = 0; x <= l; i++) {
					x = (i * l) / that.n;
					that.x_nodos[i] = x;
				}
			})(this);
		}

		set n(_n) {
			this._n = _n;
			var _L = this.L;
			
			var i, j;
			var _x = 0;
			for (i = 0; _x <= _L; i++) {
				_x = (i * _L) / _n;
				this.x_nodos[i] = _x;
			}
		}

		get n() {
			return this._n;
		}

		get nodos() {
			return this.x_nodos;
		}

		get y() {
			var v = Math.sqrt(this.tension / this.densidad),
				w = (3.1416 * this._n * v) / this.L,
				k = w / v,
				L = this.L,
				amplitud = this.A * Math.cos(w * this.t),
				x = this.x,
				y;

			y = amplitud * Math.sin(k * x);

			return y;
		}

	}






	/*LeerDatos(){
		var x_data=new Array();
		var y_data=new Array();
		var i;
		var _v=Math.sqrt(this._tension/this._densidad);		 
		var _w=(3.1416*this._n*_v)/this._l;			
		var _k=_w/_v;
		var _L=this._l;
		var dx=0.1;
		var _amplitud=this._a*Math.cos(_w*this._t);	
		var _x=0;

		for(i=0;_x<=_L;i++){
			_x=_x+dx;
			x_data[i]=_x;
			y_data[i]=_amplitud*Math.sin(_k*_x);				
		}
		
		return new TablaDeDatos(x_data,y_data);
	}*/