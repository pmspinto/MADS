<div id="addProject_window" title="New Project" class="dialog">

	<div id="newProjectForm">
		<form action="javascript: ;" class="loginform">
		<fieldset>
			<legend>Create new project</legend>
			<ol>
				<li>
					<label for="proj_name">Name:</label>  
					<input type="text" name="proj_name" id="project_name" width="200"/>
				</li>
                <li>
					<label for="proj_desc">Description:</label>
                    <textarea name="proj_desc" id="project_desc" cols="50" rows="7"></textarea>
				</li>
				<li>
					<button id="createProj_button" onClick="createProject();">Create</button>
				</li>
			</ol>
		</fieldset>
		</form>
		
	</div>
</div>

<div id="editProject_window" title="Edit Project" class="dialog">
	<div id="editProjectForm">
		<form action="javascript: ;" class="loginform">
		<fieldset>
			<legend>Edit project info</legend>
			<ol>
				<li>
					<label for="proj_name">Name:</label>  
					<input type="text" name="proj_name" id="project_name" width="200"/>
				</li>
                <li>
					<label for="proj_desc">Description:</label>
                    <textarea name="proj_desc" id="project_desc" cols="50" rows="7"></textarea>
				</li>
				<li>
					<button id="editProj_button" onClick="editProject();">Save</button>
				</li>
			</ol>
		</fieldset>
		</form>
		
	</div>
</div>

<div id="project_menu" title="Project Menu" class="dialog">
	<div id="project_menu_members" class="projectMenu">
		<fieldset>
			<legend>Manage Project Members</legend>	
				<div>
					<legend>Add new member</legend>
					<ol>
						<li>
							<label for="new_member_name">Email:</label>
							<input type="text" id="project_newMemberName_input" name="new_member_name" />
							<button id="project_addMember_button">Invite</button>
						</li>
					</ol>
				</div>
				
				<div>
					<legend>Current Members</legend>
					<ol>
						<li>
							<label for="member_name">Ivo Timóteo</label>
							<button id="project_removeMember">Remove</button>						
						</li>
						<li>
							<label for="member_name">João Gonçalves</label>
							<button id="project_removeMember">Remove</button>						
						</li>
						<li>
							<label for="member_name">Miguel Araújo</label>
							<button id="project_removeMember">Remove</button>						
						</li>
						<li>
							<label for="member_name">Pedro Pinto</label>
							<button id="project_removeMember">Remove</button>						
						</li>
						<li>
							<label for="member_name">Tiago Almeida</label>
							<button id="project_removeMember">Remove</button>						
						</li>
						<li>
							<label for="member_name">Vasco Grilo</label>
							<button id="project_removeMember">Remove</button>						
						</li>
					</ol>
		</fieldset>
	</div>
	
	<div id="project_menu_info" class="projectMenu" style="float:right">
		<fieldset style="height:320px">
			<legend>Edit Project Info</legend>
			<ol>
				<li>
					<label for="proj_name">Name:</label>  
					<input type="text" id="proj_name_input" name="proj_name"/>
				</li>
            <li>
					<label for="proj_desc">Description:</label>
                    <textarea name="proj_desc" id="proj_desc_input" cols="50" rows="7" style="resize:none"></textarea>
				</li>
				<li>
					<button onClick=";" style="float:bottom">Save</button>				
				</li>		
			</ol>
		</fieldset>
		
		<div id="project_menu_options" class="projectMenu">
			<fieldset style="height:70px">
				<legend>Edit Project Options</legend>
				<ol>
					<li>
						<label for="proj_vel">Velocity:</label>  
						<input type="text" id="proj_vel_input" name="proj_vel"/>
						<button onClick=";" style="float:right">Set Velocity</button>
					</li>
			</ol>		
			</fieldset>		
		</div>
	</div>
</div>

<script type="text/javascript">
	$('#createProj_button').button();
	$('#editProj_button').button();
</script>