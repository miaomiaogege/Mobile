Beroads.views.RadarsList = Ext.extend(Ext.Panel, {
    layout: 'card',

    title : 'List',

    initComponent: function() {
       
	var toolbarBase = {
            xtype: 'toolbar',
            title: 'Radars'
        };

        this.list = new Ext.List({
            grouped: false,
            itemTpl: '<span class="name">{name}</span> <span class="secondary">{type}</span>',
            loadingText: "Loading...",
            store: new Ext.data.Store({
                model: 'Radar',
                proxy: {
                    type: 'scripttag',
                    url : 'http://tdt-dev.irail.be/IWay/Radar/'+localStorage.getItem('lang')+'/'+localStorage.getItem('region')+'.jsonp',
                    reader: {
                        type: 'json',
                        root: 'radar'
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
        
        
        
        Beroads.views.RadarsList.superclass.initComponent.call(this);

    },
    
    
    
    initializeData: function(data) {
	
	data = data.item;
	Beroads.stores.radars.add.apply(Beroads.stores.radars, radars);
	Beroads.stores.radars.sort('name');
        
    },
    
   
    
    onSelect: function(selectionmodel, records){
        if (records[0] !== undefined) {
            var sessionCard = new Beroads.views.radarsDetail({
                prevCard: this,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            Ext.getCmp('main').setActiveItem(sessionCard, {type: 'slide', reverse: false});
        }
    }
});

Ext.reg('Beroads.views.RadarsList', Beroads.views.RadarsList);
