<div id="welcomedialog" title="Banana Tracker">
	<div id="loginleft">
		Coisas bonitas deste lado, assim como uma imagem e texto. mas se isto for muito longo acho que merda no entanto vamos testar. 
		 mas se isto for muito longo acho que merda no entanto vamos testar. 
		  mas se isto for muito longo acho que merda no entanto vamos testar. 
		   mas se isto for muito longo acho que merda no entanto vamos testar. 
		    mas se isto for muito longo acho que merda no entanto vamos testar. 
			 mas se isto for muito longo acho que merda no entanto vamos testar. 
			 
	</div>
	
	<div id="loginright">
		<form action="javascript: loginAction();" class="loginform">
		<fieldset>
			<legend>Login</legend>
			<ol>
				<li>
					<label for="email">Email:</label>  
					<input type="text" name="email" id="loginemail" />
				</li>
				<li>
					<label for="password">Password:</label> 
					<input type="password" name="password" id="loginpassword"/>
				</li>
				<li>
					<button id="auth_button">Login</button>
				</li>
			</ol>
		</fieldset>
		</form>
		
		<form action="javascript: registerAction();" class="loginform">
		<fieldset>
			<legend>Register</legend>
			<ol>
				<li>
					<label for="email">Email:</label>  
					<input type="text" name="email"  id="registeremail"/>
				</li>
				<li>
					<label for="name">Name:</label>  
					<input type="text" name="name"  id="registername"/>
				</li>
				<li>
					<label for="password">Password:</label> 
					<input type="password" name="password"  id="registerpassword"/>
				</li>
				<li>
					<label for="cpassword">Confirm password:</label> 
					<input type="password" name="cpassword"  id="registercpassword"/>
				</li>
				<li>
					<button id="register_button">Register</button>
				</li>
			</ol>
		</fieldset>
		</form>
	</div>
</div>

<script type="text/javascript">
	$("#auth_button").button();
	$("#register_button").button();
</script>
