Beroads.stores.Cameras = new Ext.data.Store({
    model : 'Camera',
    autoload : false,
    getGroupString: function(r){
		return r.get('city');
    }
});
