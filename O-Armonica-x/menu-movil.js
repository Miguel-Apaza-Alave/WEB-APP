
    var amplitud = document.getElementById('Amplitud');
    noUiSlider.create(amplitud, {
      start: [ onda_inicial.a ],
      step: 0.2,
     
      range: {
        'min': [ 0.2 ],
        'max': [ 3 ]
      },
        format: wNumb({
        decimals: 1
      })

    });

    var label_amplitud = document.getElementById('label-Amplitud');
    amplitud.noUiSlider.on('update', function( values, handle ) {
      onda.A=values[handle];
     
      
      Plot.Repaint();
      label_amplitud.innerHTML="<div>" + "Amplitud :  " +  values[handle] + "[m]" + "</div>";
    });
//*********************************************************************************
    var longitud_Onda = document.getElementById('Longitud-Onda');
    noUiSlider.create(longitud_Onda, {
      start: [ onda_inicial.lamda ],
      step: 0.5,
     
      range: {
        'min': [ 1 ],
        'max': [ 10 ]
      },
        format: wNumb({
        decimals: 1
      })

    });

    var label_longitud = document.getElementById('label-Longitud');
    longitud_Onda.noUiSlider.on('update', function( values, handle ) {
      onda.periodoEspacial=values[handle];
     
      Plot.Repaint();
        
      label_longitud.innerHTML="<div>" + "Longitud:" +  values[handle] + "[m]" + "</div>";
    });

//*********************************************************************************
    var periodo_T = document.getElementById('Periodo-T');
    noUiSlider.create(periodo_T, {
      start: [ onda_inicial.T ],
      step: 0.5,
     
      range: {
        'min': [ 2 ],
        'max': [ 10 ]
      },
        format: wNumb({
        decimals: 1
      })

    });

    var label_periodo_T = document.getElementById('label-Periodo-T');
    periodo_T.noUiSlider.on('update', function( values, handle ) {
      onda.T=values[handle];
      
      Plot.Repaint();
       
      label_periodo_T.innerHTML="<div>" + "Período T:  " +  values[handle] + "[s]" + "</div>";
    });    