Beroads.views.RadarsDetail = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    showSessionData: true,
    initComponent: function(){
        this.dockedItems = [{
            xtype: 'toolbar',
            title: this.record.data.name,
            items: [{
                ui: 'back',
                text: _tr('back', localStorage.getItem('lang')),
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            }]
        }];
        
        this.items = [{
            styleHtmlContent: true,
            tpl: new Ext.XTemplate( '<div class="radar_overview"><h3>{name}</h3></div>'),
            data: this.record.data
        }];
        
       
        this.listeners = {
            activate: { fn: function(){
                if (this.list) {
                    this.list.getSelectionModel().deselectAll();
                }
            }, scope: this }
        };
        
        Beroads.views.RadarsDetail.superclass.initComponent.call(this);
    }
});

Ext.reg('Beroads.views.RadarsDetail', Beroads.views.RadarsDetail);
