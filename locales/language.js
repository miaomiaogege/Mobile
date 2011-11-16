

function _tr(str, language){
	var lang = {
		"translations" :
		 {
		 
		 	"en" : { 
					about : "About",
					overview : "Overview",
					credits : "Credits",
					map : "Map",
					settings : "Settings",
					back : "Back",
					language : "Language",
					area : "Area",
					options : "Options",
					save : "Save",
					traffic : "Traffic",
					radars : "Radars",
					webcams : "Webcams"
			},
			
			"fr" : {
				about : "A propos",
				overview : "Aperçu",
				credits : "Crédits",
				map : "Carte",
				settings : "Réglages",
				back : "Retour",
				language : "Langage",
				area : "Zone",
				options : "Options",
				save : "Sauver",
				traffic : "Traffic",
				radars : "Radars",
				webcams : "Webcams"
			},
			
			"nl" : {
				about : "Over",
				overview : "Overzicht",
				credits : "Credits",
				map : "Kaart",
				settings : "Instellingen",
				back : "Terug",
				language : "Taal",
				area : "Gebied",
				options : "Opties",
				save : "Besparen",
				traffic : "Verkeer",
				radars : "Radars",
				webcams : "Webcams"
			},
			
			"de" : {
				about : "Over",
				overview : "Overzicht",
				credits : "Credits",
				map : "Kaart",
				settings : "Instellingen",
				back : "Terug",
				language : "Taal",
				area : "Gebied",
				options : "Opties",
				save : "Besparen",
				traffic : "Verkeer",
				radars : "Radars",
				webcams : "Webcams"
			}
		
				
		
		}
	
	};
		
	//TODO navigate with variables
	
	
	return lang.translations[language][str] || lang.translations.en.overview	 || "{translation key not found}";
}