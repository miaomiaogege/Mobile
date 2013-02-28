Ext.define('BeRoads.controller.portraittablet.Settings', {
    extend:'BeRoads.controller.Settings',

    views:['Settings'],

    config:{
        refs:{
            userFormSaveButton:'#userFormSaveButton',
            userFormFieldset:'#userFormFieldset',
            saveButton:'#saveButton',
            settingsPanel : '#settingsPanel',
			navigationTabPanel : '#navigationTabPanel',
            preferenceButton : '#preferenceButton',
			menuButton : '#menuButton',
            moreButton : '#moreButton',
			backButton : '#backButton',
            settingsNavigationView : '#settingsNavigationView'
        },
        control:{
            userFormFieldset : {
				show : 'loadSettingsPanel',
                erased : 'destroySettingsPanel'
            },
            saveButton:{
                tap:'onSaveButtonTap'
            },
            moreButton : {
                tap : 'onMoreButtonTap'
            }
        }
    },

    init:function () {

        this.callParent(arguments);

    },

	loadSettingsPanel : function(cmp){
		
        this.getUserFormFieldset().setInstructions(_tr('settings_message', localStorage.getItem('lang')));
	},
	
    destroySettingsPanel : function(){

        this.getPreferenceButton().show();
        this.getSaveButton().hide();
        //this.callParent(arguments);
    },

    onSaveButtonTap:function () {

        //we reset this to 1970 epoch
        var values = this.getUserFormFieldset().getFieldsAsArray();
        localStorage.setItem('area', values[0].getValue());
        localStorage.setItem('lang', values[1].getValue());
        localStorage.setItem('displayTraffic', (values[2].getValue() == 0 ? false : true));
        localStorage.setItem('displayRadars', (values[3].getValue() == 0 ? false : true));
        localStorage.setItem('displayCameras', (values[4].getValue()== 0 ? false : true));
        localStorage.setItem('lastUpdate', 0);
        this.destroy();
        window.location.reload();
    },
    onMoreButtonTap:function () {

        var me = this;
        Ext.Ajax.request({
            url: 'app/view/credits.html',
            success: function(rs){
                me.getSettingsNavigationView().push({
                    xtype: 'panel',
                    title: 'About',
                    html:rs.responseText,
                    styleHtmlContent : true,
                    padding : '25 25 25 25'
                });
				
				me.getSaveButton().hide();
		        me.getPreferenceButton().hide();
				me.getBackButton().show();
				me.getMenuButton().hide();
				
            },
            scope: this
        });

    }
});
