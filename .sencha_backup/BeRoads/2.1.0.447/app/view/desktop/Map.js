Ext.define('BeRoads.view.desktop.Map', {
    extend:'BeRoads.view.Map',

    config:{
        title : 'Map',
        highAccuracy:true,
        mapOptions:{
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            navigationControl:true,
            navigationControlOptions:{
                style:google.maps.NavigationControlStyle.DEFAULT
            }
        }
    }
});