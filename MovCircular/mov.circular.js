  /***
   *   28/05/2016  -Se agregó el vector aceleración centripeta
   *   27/05/2016
   *
   *
   *   Autor: Miguel R. Apaza Alave
   */


  class MovimientoCircular {
    constructor(_r, _w, _m) {

      //this.r = _r || 1;
      //this.m = _m || 1;
      var t=0;
      //**********************


      this.datos = {
        r: _r || 1,
        m: _m || 1,
        T: (2 * Math.PI) / _w,
        w: _w,
        f: _w / (2 * Math.PI),
        actualizar: function () {
          this.T = (2 * Math.PI) / this.w;
         
          this.f = 1/ this.T; //_w / (2 * Math.PI);

        }
      }

      this.R = new Vector(0, 0, 0);
      var K = new Vector(0, 0, _w);

      this.t = function (_t) {

        if (_t !== undefined) {
          t=_t;
          this.Actualizar();
        } else {
          return t;
        }
      }

      this.Actualizar = function (){
          var wt = this.datos.w * t;
          var sinwt = Math.sin(wt);
          var coswt = Math.cos(wt);


          this.R.x = this.r * coswt;
          this.R.y = this.r * sinwt;
          this.R.z = 0;

          K.z = this.datos.w;;
          this.v = Vector.ProductoCruz(K, this.R);
          this.a = Vector.ProductoCruz(K, this.v);        
      }
      
      this.Actualizar();
    }// Final del constructor

    set m(_m){
      this.datos.m = _m;
      this.Actualizar();
    }

    get m(){
      return this.datos.m;
    }

    set r(_r){
      this.datos.r = _r;
      this.Actualizar();
    }

    get r (){
      return this.datos.r;
    }    

    set T(_T) {
      this.datos.w = ( 2 * Math.PI )/ _T;
      this.datos.actualizar();
      this.Actualizar();
    }

    get T() {
      return this.datos.T;
    }

    set f(_f) {
      this.datos.w = ( 2 * Math.PI ) * _f;
      this.datos.actualizar();
      this.Actualizar();
    }

    get f() {
      return this.datos.f;
    }

    set w(_w) {
      this.datos.w = _w;
      this.datos.actualizar();
      this.Actualizar();
    }

    get coordenadas() {
      return this.R;
    }

    get velocidad() {
      return this.v;
    }

    get aceleracionCentripeta() {
      return this.a;
    }

    get fuerzaCentripeta() {
      this.a.Multiplicarle(this.m);
      return this.a;
    }

    get fuerzaCentrifuga() {
      /*Falta Implementar*/
      return true;
    }


  }


