<div id="mainMenu" title="Main Menu" style="display: none">

	<script type="text/javascript" >
		// manages the tabs
		$('#tabs').tabs();
		
	</script>	
	
	<div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="tabs">
		<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
			<li class="ui-state-default ui-corner-top "><a href="#tab-projeto">Projeto</a></li>
			<li class="ui-state-default ui-corner-top"><a href="#tab-equipa">Equipa</a></li>
			<li class="ui-state-default ui-corner-top"><a href="#tab-opcoes">Opções</a></li>
		</ul>
		<div class="ui-tabs-panel ui-widget-content ui-corner-bottom" id="tab-projeto">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
        <p>
        <button id="addProject_button" onclick="addProjectWindow();">
            New Project
        </button>
        <button id="editProject_button" onclick="editProjectWindow();">Edit Project</button>
        </div>
		<div class="ui-tabs-panel ui-widget-content ui-corner-bottom" id="tab-equipa">Phasellus mattis tincidunt nibh. Cras orci urna, blandit id, pretium vel, aliquet ornare, felis. Maecenas scelerisque sem non nisl. Fusce sed lorem in enim dictum bibendum.</div>
		<div class="ui-tabs-panel ui-widget-content ui-corner-bottom" id="tab-opcoes">Nam dui erat, auctor a, dignissim quis, sollicitudin eu, felis. Pellentesque nisi urna, interdum eget, sagittis et, consequat vestibulum, lacus. Mauris porttitor ullamcorper augue.</div>

	</div>
    
</div>

<script type="text/javascript">
		$('#addProject_button').button();
		$('#editProject_button').button();
	</script>