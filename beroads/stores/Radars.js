Beroads.stores.Radars = new Ext.data.Store({
    model : 'Radar',
    autoload : false,
    getGroupString: function(r){
		return r.get('name');
    }
});

