//autocomplete.js

//When the document has loaded, set up the dropdown with the autocomplete feature.
$(document).ready(function() {
	setupDropdown();
});
		  
var selectionOccurred = false;
			
//Configure the dropdown by adding options as well as adding the autocomplete functionality.
function setupDropdown() {
			
	//Create a list of countries to be added to the dropdown.
	var countries = ["Canada", "China", "France", "Ireland", "Japan", "Mexico", "Spain", "Switzerland", "United States"];
				
	$('#countries').autocomplete({
		source: countries,
		minLength: 0,
		scroll: true,
		select: function(event, ui) {
			selectCountry(event, ui);
		},
		change: function(event, ui) {		
			//If a selection has been made and the country is empty, then reset the field text to provide instructions to the user.
			if (!selectionOccurred && ui.item === null) {
				$('#countries').css('font-style','italic').css('color','gray');
				$('#countries').val('Type the component name or choose from the list.');
							
				//Remove the selected country text from the screen and reset the field containing the previously selected country.
				$('#selectedCountry').html('');
				if ($('#previousSelectedCountry') != '') {
					$('#previousSelectedCountry').val('');
				}
			}
			//If a selection has been made and the country is not empty, then do nothing.  
			else {
				selectionOccurred = false;
			}
		}
		})
		//When the focus is on the dropdown, enable the search feature on the field and remove any country previously selected
		//from the textfield.
		.focus(function() {
			$(this).autocomplete("search", "");
			$('#countries').val('');
			$('#countries').css('font-style','normal').css('color','black');
		});	
}
			
//This function is called when a country has been selected.
function selectCountry(event, ui) {
				
	$('#selectedCountry').html(ui.item.value);
	$('#previousSelectedCountry').val(ui.item.value);
				
	//Set the variable that indicates a selection was just made then drop the focus from the field.  Note that
	//the change function of the autocomplete control will fire when the dropdown loses focus.
	selectionOccurred = true;
	$('#countries').blur();
}
