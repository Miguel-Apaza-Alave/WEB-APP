/***
 * 2/06/16 Se inicia el desarrollo del programa
 *         -Se ha escritó clase Onda Armónica.
 * 3/06/16 -Se ha corregido los bugs relacionado con la independencia de las variables
 *
 *   class OndaArmonica
 *   constructor(A,k,lamda,T)
 *       get y()
 *       set A(_a)
 *       get A()
 *       set t(_t)
 *       get t()
 *       set x(_x)
 *       get x()
 *       set f(_f)
 *       set k(_k)
 *       get k()
 *       set T(_T)
 *       get T()
 *       set periodoEspacial(lamda)
 *       get periodoEspacial()
 *       get velocidad()
 *
 */

class OndaArmonica {
    constructor(config) {
        this.A = config.A;
        this.t = config.t;
        this.x = config.x;
        this._k = (2 * Math.PI) / config.periodoEspacial;
        this._v = config.periodo / config.T;
        this._w = this._k * this._v;
        this._T = config.T;
        this._periodoEspacial = config.periodoEspacial;
    }

    get y() {
        var y;
            y = this.A * Math.sin(this._k * this.x - this._w * this.t);
        return y;
    }

    set f(_f) {
        this._f = _f;
        this._T = 1 / _f;
        this._w = 2 * Math.PI * _f;
    }

    set k(_k) {
        this._k = _k;
        this._periodoEspacial = 2 * Math.PI / _k;
    }

    get k() {
        return this._k;
    }

    set T(_T) {
        this._T = _T;
        this._f = 1/ _T;
        this._w = 2 * Math.PI / _T;

    }

    get T() {
        return this._T;
    }

    set periodoEspacial(_periodo) {
        this._periodoEspacial = _periodo;
        this._k = 2 * Math.PI / _periodo;
    }

    get periodoEspacial() {
        return this._periodoEspacial;
    }

}
