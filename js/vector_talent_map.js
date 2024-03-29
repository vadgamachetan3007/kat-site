$(document).ready(function(){
    $(function(){
        $.getJSON('https://manage.thekatagency.com/api/v1/website/talent_map', function(data){
            var data_inside = data.data;
            var state_values = new Array();
            for (var key in data_inside.states) {
                state_values.push(data_inside.states[key]);
            }
            statesValues = jvm.values.apply({}, jvm.values([state_values]));

            $('#world-map-gdp').vectorMap({
                map: 'us_aea_en',
                backgroundColor: "transparent",
                markers: data_inside.coords,
                series: {
                    regions: [{
                        scale: ['#DEEBF7', '#08519C'],
                        attribute: 'fill',
                        values: data_inside.states,
                        min: jvm.min(statesValues),
                        max: jvm.max(statesValues)
                    }]
                },
                onMarkerTipShow: function(event, label, index){
                    label.html(
                        '<b>'+data_inside.names[index]+'</b><br/>'
                    );
                },
                onRegionTipShow: function(event, label, code){
                    label.html(
                        '<b>'+label.html()+'</b></br>'+
                        '<b>Number of talents: </b>' + data_inside.states[code]
                    );
                }
            });

            var mapObject = $('#world-map-gdp').vectorMap('get', 'mapObject');
        });
    });
});