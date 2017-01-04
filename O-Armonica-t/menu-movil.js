
    var index_T,
        index_f;


    var amplitud = document.getElementById('Amplitud');
    noUiSlider.create(amplitud, {
      start: [ init.A ],
      step: 0.2,
     
      range: {
        'min': [ 0.2 ],
        'max': [ 3 ]
      },
        format: wNumb({
        decimals: 0,
      })

    });

    var l_amplitud = document.getElementById('L-Amplitud');
    amplitud.noUiSlider.on('update', function( values, handle ) {
      onda.A=values[handle];
      Plot.Repaint();
      l_amplitud.innerHTML="<div>" + "Amplitud :  " +  values[handle] + "(m)" + "</div>";
    });
//*********************************************************************************
    var periodo_T = document.getElementById('Periodo-T');
    noUiSlider.create(periodo_T, {
      start: [ init.T ],
      step: 0.5,
     
      range: {
        'min': [ 1 ],
        'max': [ 9 ]
      },
        format: wNumb({
        decimals: 1,
      })

    });


   /* var frecuencia = document.getElementById('frecuencia');
    noUiSlider.create(frecuencia, {
      start: [ init.T ],
      step: 0.5,
     
      range: {
        'min': [ 1 ],
        'max': [ 9 ]
      },
        format: wNumb({
        decimals: 1,
      })

    });*/

    function Ru(value){
      console.log(index_f !== index_T);
      if (index_f !== index_T){
        frecuencia.noUiSlider.set(value);
        periodo_T.noUiSlider.set(value);
      }  
    }


    var l_periodo_T = document.getElementById('L-Periodo-T');
    periodo_T.noUiSlider.on('update', function( values, handle ) {
      onda.T=values[handle]*1;
      Plot.Repaint();
      console.log(values, handle);
      l_periodo_T.innerHTML="<div>" + "Período T :  " +  values[handle] + "(s)" + "</div>";
      index_T=handle;
   
    });







/*
    var l_frecuencia = document.getElementById('l-frecuencia');
    frecuencia.noUiSlider.on('update', function( values, handle ) {
      onda.T=values[handle]*1;
      Plot.Repaint();
      
      l_frecuencia.innerHTML="<div>" + "Período T :  " +  values[handle] + "(s)" + "</div>";
      index_f=handle;
   
    });    

*/