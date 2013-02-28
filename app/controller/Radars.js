Ext.define('BeRoads.controller.Radars', {
    extend: 'Ext.app.Controller',

    views: ['radars.List', 'radars.Detail'],
    store : ['offline.Radar','online.Radar'],
    config: {
        refs: {
            radarsList: '#radarsList',
            main: '#mainpanel'
        },
        control: {
            radarsList: {
                show :'loadRadarPanel',
                disclose: 'onItemTap'
            }
        }
    },

    init:function () {
        this.callParent(arguments);
    },

	/**
	 *	Bind the offline radars store to the radarsList list view
	 *	@return
	 */
    loadRadarPanel : function(cmp, eOpts) {
        cmp.setStore(Ext.getStore('offline.Radar'));
        cmp.refresh();
    },

	/**
	 *¨	Push the radar detailed view
	 *	@return
	 */
    onItemTap:function (cmp, index, target, record, e, eOpts ){
       
        /*if (record !== undefined) {
            this.getMain().push({
                xtype: 'radarDetail',
                title: record.getData().id,
                data: record.getData()
            });
        }*/
    }
});