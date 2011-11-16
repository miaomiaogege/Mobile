Beroads.views.AboutList = Ext.extend(Ext.Panel, {
    layout: 'card',
    initComponent: function(){
        
        this.list = new Ext.List({
            itemTpl: '<div class="page">{title}</div>',
            ui: 'round',
            store: new Ext.data.Store({
                fields: ['name', 'card'],
                data: this.pages
            }),
            listeners: {
                selectionchange: {fn: this.onSelect, scope: this}
            },
            title: _tr('about', localStorage.getItem('lang'))
        });
        
        this.listpanel = new Ext.Panel({
            title: _tr('about', localStorage.getItem('lang')),
            items: this.list,
            layout: 'fit',
            dockedItems: {
                xtype: 'toolbar',
                title: _tr('about', localStorage.getItem('lang'))
            }
        })
        
        this.listpanel.on('activate', function(){
            this.list.getSelectionModel().deselectAll();
        }, this);
        
        this.items = [this.listpanel];
        
        Beroads.views.AboutList.superclass.initComponent.call(this);
    },
    
    onSelect: function(sel, records){
        if (records[0] !== undefined) {
            var newCard = Ext.apply({}, records[0].data.card, { 
                prevCard: this.listpanel,
                title: records[0].data.title
            });
            
            this.setActiveItem(Ext.create(newCard), 'slide');
        }
    }
});

Ext.reg('aboutlist', Beroads.views.AboutList);