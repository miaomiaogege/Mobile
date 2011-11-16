Beroads.views.Settings = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',

    initComponent: function(){
        var titlebar, cancelButton, buttonbar, saveButton, fields;

        cancelButton = {
            text: 'Retour',
            ui: 'back',
            handler: this.onCancelAction
        };

        titlebar = {
            id: 'userFormTitlebar',
            xtype: 'toolbar',
            title: 'Réglages',
            items: [ cancelButton ]
        };

        saveButton = {
            id: 'userFormSaveButton',
            text: 'Sauver',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{xtype: 'spacer'}, saveButton]
        };

        fields = {
            xtype: 'fieldset',
            id: 'userFormFieldset',
            title: 'Préférences',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                labelWidth: '40%',
                required: false,
                useClearIcon: true,
                autoCapitalize : false
            },
            items: [
            	{xtype: 'numberfield',
            		id : 'area',
                    name: 'area',
                    label: 'Area',
                    maxLength: 10,
                    value : localStorage.getItem('area'),
                    useClearIcon: true
                },
                {
		    xtype: 'fieldset',
		    title: 'Langage',
		    id : 'language', 
		    items: [{
		        xtype: 'selectfield',
		        name: 'lang',
		        id: 'lang',
		        options: [
		            {text: 'Français',  value: 'fr'},
		            {text: 'Dutch', value: 'nl'},
		            {text: 'German', value: 'de'},
			    	{text: 'English', value: 'en'}
		        ],
		        value : localStorage.getItem('lang')
		    }]
		},
		{
		    xtype: 'fieldset',
		    title: 'Option carte', 
		    name : 'map',
		    
		    items: [
			{
		
			    xtype: 'togglefield',
			    name: 'displayTraffic',
			    label: 'Traffic',
			    id : 'displayTraffic',
			    value : (localStorage.getItem('displayTraffic') == 'false' ? 0 : 1)
			},
			{
			    xtype: 'togglefield',
			    name: 'displayRadars',
			    id : 'displayRadars',
			    label: 'Radars',
			    value : (localStorage.getItem('displayRadars') == 'false' ? 0 : 1)
			},
			    {
			    xtype: 'togglefield',
			    name: 'displayCameras',
                id : 'displayCameras',
			    label: 'Cameras',
			    value : (localStorage.getItem('displayCameras') == 'false' ? 0 : 1)
			}
            	]
		}]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar, buttonbar ],
            items: [ fields ]
        });

        Beroads.views.Settings.superclass.initComponent.call(this);
    },

    onCancelAction: function() {
        Ext.getCmp('main').setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
    },

    onSaveAction: function() {

		
		var values = this.getValues();
		console.log(values);
		
		localStorage.setItem('area',values['area']);
		localStorage.setItem('lang',values['lang']);
		localStorage.setItem('displayTraffic', (values['displayTraffic']== 0 ? false : true));
		localStorage.setItem('displayRadars', (values['displayRadars']== 0 ? false : true));
		localStorage.setItem('displayCameras', (values['displayCameras']== 0 ? false : true));
		
		Ext.getCmp('main').setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
        
    }

});

Ext.reg('Beroads.views.Settings', Beroads.views.Settings);