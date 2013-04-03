Ext.define('BeRoads.controller.TrafficEvents', {
    extend:'Ext.app.Controller',

<<<<<<< HEAD
	displayed : false,		//if true, the title of the detailed view keep scrolling

=======
    /*
        This variable is used to scroll a traffic event title when a detailed view shows up
    */
	displayed : false,	
    views:['trafficevents.List', 'trafficevents.Detail'],
    store : ['offline.TrafficEvent','online.TrafficEvent'],
>>>>>>> 8fb781646e3d42e194ce10c08bb2e7a6392f422a
    config: {
        store : ['offline.TrafficEvent','online.TrafficEvent'],
        views:['trafficevents.List', 'trafficevents.Detail'],
        refs: {
            trafficeventsList: '#trafficeventsList',
            main: '#mainpanel',
            trafficMap: '#trafficMap'
        },
        control: {
            trafficeventsList: {
                itemtap: 'onItemTap',
                show  :'loadTrafficEventsPanel'
            }
        }
    },

    init:function () {
		this.displayed = true;
		this.callParent(arguments);
    },

    /**
     *   Change the text values of the view to the current language value.
     *   @return 
    */
    updateLanguage : function() {
        return;
    },
	/**
	 *	Bind the offline traffic events store to the trafficeventsList
	 *	@return 
	*/
    loadTrafficEventsPanel:function (cmp, eOpts) {
      	this.displayed = false;
  		cmp.setStore(Ext.getStore('offline.TrafficEvent'));
        cmp.refresh();
    },

	/**
	 *	Push the traffic event detailed view
	 *	@return
	*/
    onItemTap:function (cmp, index, target, record, e, eOpts ){
		this.displayed = true;
        if (record !== undefined) {
            this.getMain().push({
                xtype: 'trafficeventDetail',
                title: record.getData().location,
                data: record.getData()
            });
        }
    }
});