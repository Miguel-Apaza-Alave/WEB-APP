
   var periodo_T = document.getElementById('Periodo-T');

    noUiSlider.create(periodo_T, {
      start: 7,
      step: .1,
     
      range: {
        'min': 7,
        'max': 17 
      },
    
     format: wNumb({
        decimals: 0,
      })

    });

    var l_periodo_T = document.getElementById('L-Periodo-T');

    periodo_T.noUiSlider.on('update', function( values, handle ) {

      circular.T=values[handle];     
      l_periodo_T.innerText='Período T: ' + (1*values[handle]).toFixed(1) + '(s)';
      if (loop == 0){
        plot.Repaint();
      }
    });



   var radio_E = document.getElementById('radio-E');

    noUiSlider.create(radio_E, {
      start: 6,
      step: .2,
     
      range: {
        'min':  1 ,
        'max':  6 
      },

        format: wNumb({
        decimals: 0,
      })

    });

    var l_radio = document.getElementById('L-radio');

    radio_E.noUiSlider.on('update', function( values, handle ) {
      circular.r=values[handle]; 
      l_radio.innerText='Radio: ' + (1 * values[handle]).toFixed(1) + '(m)'
      
      if (loop == 0){
        plot.Repaint();
      }

    });

    var masa_E = document.getElementById('masa-E');
    var l_masa = document.getElementById('l-masa');
    noUiSlider.create(masa_E, {
      start: 1,
      step: 0.05,
     
      range: {
        'min': [ 0.1 ],
        'max': [ 1 ]
      },

        format: wNumb({
        decimals: 0,
      })

    });

    masa_E.noUiSlider.on('update', function( values, handle ) {
      circular.m = values[handle];
      l_masa.innerText = 'Masa: ' + (1 * values[handle]).toFixed(1) + '(kg)';
      if (loop == 0){
        plot.Repaint();
      }
      
    });

