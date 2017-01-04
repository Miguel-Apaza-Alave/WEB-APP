
    var Tension = document.getElementById('Tension');

    noUiSlider.create(Tension, {
      start: [onda_config.tension ],
      step: 1,
      
      range: {
        'min': [ 1 ],
        'max': [ 10 ]
      },

        format: wNumb({
        decimals: 0
      })

    });

    var label_Tension = document.getElementById('label-Tension');
    Tension.noUiSlider.on('update', function( values, handle ) {
     
      var valor=values[handle];
      onda.tension=valor;
           
      plot.Repaint();
      label_Tension.innerHTML="<div>" + "Tensión :  " +  valor + "[N]" + "</div>";
    });

    //****************************************

    var Densidad = document.getElementById('Densidad');

    noUiSlider.create(Densidad, {
      start: [ onda_config.densidad ],
      step: 0.1,
     
      range: {
        'min': [ 0.1 ],
        'max': [ 1 ]
      },

       format: wNumb({
        decimals: 0
      })
      
    });

    var label_Densidad = document.getElementById('label-Densidad');

    Densidad.noUiSlider.on('update', function( values, handle ) {
      var valor=values[handle];
      var value=Math.round(valor);
      onda.densidad=values[handle];
      
      plot.Repaint();

      label_Densidad.innerHTML="<div>" + "Densidad : " +  values[handle] + "[kg/m]" + "</div>";
    });

    //******************************

    var n = document.getElementById('N');

    noUiSlider.create(n, {
      start: onda_config.n,
      step: 1,
     
      range: {
        'min': [ 1 ],
        'max': [ 5 ]
      },
       format: wNumb({
        decimals: 0
      })

    });

    var label_n = document.getElementById('label-N');

    n.noUiSlider.on('update', function( values, handle ) {
    
      var titulos=new Array("Modo fundamental","Segundo modo normal",
        "Tercer modo normal","Cuarto modo normal","Quinto modo normal","Sexto modo normal");
      var armonico=document.getElementById('Armonico');
      armonico.innerHTML=titulos[values-1];
      onda.n=values[handle];
    
      plot.Repaint();
      label_n.innerHTML="<div>" + "Valor de n :" +  values[handle] + "</div>";
    });

    
      
  
