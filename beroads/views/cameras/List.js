Beroads.views.CamerasList = Ext.extend(Ext.Panel, {
    layout: 'card',
   
    title : 'List',
    initComponent: function() {
       

	this.dockedItems = [{
            xtype: 'toolbar',
            title: 'Cameras'
        }]

        this.list = new Ext.List({
            grouped: true,
            itemTpl: '<div class="avatar" style="background-image: url({img})"></div><span class="name">{city}</span>',
            loadingText: "Loading...",
            store: new Ext.data.Store({
                model: 'Camera',
                getGroupString : function(record) {
			        return  "<span style='display:none'>"+record.get('zone')+"</span>";			        
			    },
                proxy: {
                    type: 'scripttag',
                    url : 'http://91.121.10.214/The-DataTank/IWay/Camera/',
                    extraParams : { format : 'json',
                    				from : localStorage.getItem('userCoords'), 
		        					area : localStorage.getItem('area')
		        	},
                    reader: {
                        type: 'json',
                        root: 'item'
                    }
                },
                listeners: {
                    load: { fn: this.initializeData, scope: this }
                }
            })
        });
        
        this.list.on('selectionchange', this.onSelect, this);
        
        this.list.on('render', function(){
            this.list.store.load();
            this.list.el.mask('<span class="top"></span><span class="right"></span><span class="bottom"></span><span class="left"></span>', 'x-spinner', false);
        }, this);
        
        this.listpanel = new Ext.Panel({
            items: this.list,
            layout: 'fit',
           
            listeners: {
                activate: { fn: function(){
                    this.list.getSelectionModel().deselectAll();
                    Ext.repaint();
                }, scope: this }
            }
        })
        
        this.items = this.listpanel;
        
        Beroads.views.CamerasList.superclass.initComponent.call(this);

    },   
  
    
    initializeData: function(data) {
	
		var cameras = []; 

	    for (var i = 0; i < data.length; i++) {
		       	
		        cameras.push(data.items[i].data);
		        
		}
		Beroads.stores.cameras.add.apply(Beroads.stores.cameras, cameras);
		Beroads.stores.cameras.sort('city');
		
		 // Gather zones, create a splitbutton around them
            var zones = data.collect('zone'),
                buttons = [],
                length  = zones.length,
                i;


            for (i = 0; i < length; i++) {
                buttons.push({
                    text: zones[i],
                    dateData: zones[i],
                    index: i,
                    scope: this,
                    handler : this.changeZone
                });
            }
            
            this.zoneButtons = new Ext.SegmentedButton({
                items: buttons,
                defaults: { flex: 1 },
                style: 'width: 100%'
            });
            
            this.listpanel.addDocked({
                xtype: 'toolbar',
                ui: 'gray',
                items: this.zoneButtons,
                layout: { pack: 'center' }
            });
            
            // Take off the spinner
            this.list.el.unmask();
     
        	this.zoneButtons.setPressed(0);
            this.changeZone(this.zoneButtons.items.getAt(0));
            this.doComponentLayout();
            
    },
    
    
    changeZone: function(btn) {
        this.list.store.clearFilter();
        this.list.store.filter('zone', btn.dateData);
        this.list.scroller.scrollTo({y: 0}, false);
    }, 
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.CamerasDetail({
                prevCard: this,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard, {type: 'slide', reverse: false});
        }
    }
});

Ext.reg('Beroads.views.CamerasList', Beroads.views.CamerasList);