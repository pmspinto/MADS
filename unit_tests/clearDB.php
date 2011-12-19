<?php
	header("Content-Type: text/html; charset=utf8");
	
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);
	ini_set('display_errors',1);

	session_start();

	require "../ajax/db.php";

	$query = "SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';

			--
			-- Database: `ei07089`
			--

			-- --------------------------------------------------------

			--
			-- Table structure for table `projects`
			--

			DROP TABLE IF EXISTS `projects`;
			CREATE TABLE IF NOT EXISTS `projects` (
			  `id` int(11) NOT NULL auto_increment,
			  `name` varchar(64) NOT NULL,
			  `email` varchar(64) NOT NULL,
			  `creationdate` datetime NOT NULL,
			  `description` varchar(500) NOT NULL default 'Sem descriÃ§Ã£o',
			  PRIMARY KEY  (`id`)
			) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

			--
			-- Dumping data for table `projects`
			--

			INSERT INTO `projects` (`id`, `name`, `email`, `creationdate`, `description`) VALUES
			(1, 'Tutorial 1', 'mads@fe.up.pt', '2011-10-07 10:57:15', ''),
			(2, 'MADS', 'mads@fe.up.pt', '2011-10-07 11:05:29', ''),
			(5, 'Tutorial', 'v@gmail.com', '2011-10-19 14:40:59', ''),
			(20, 'Tutorial', 'a@a.a', '2011-10-19 16:10:46', ''),
			(21, 'Tutorial', 'coiso@fe.up.pt', '2011-10-19 17:13:24', ''),
			(23, 'Tracker', 'mads@fe.up.pt', '2011-11-21 22:58:29', 'Cena mais robuscada.'),
			(24, '', 'mads@fe.up.pt', '2011-11-23 11:10:32', ''),
			(25, 'lo', 'mads@fe.up.pt', '2011-11-23 14:36:12', 'lol'),
			(27, 'Tutorial', 'ei07089@fe.up.pt', '2011-12-18 19:00:07', 'Sem descriÃ§Ã£o');

			-- --------------------------------------------------------

			--
			-- Table structure for table `project_users`
			--

			DROP TABLE IF EXISTS `project_users`;
			CREATE TABLE IF NOT EXISTS `project_users` (
			  `id` int(11) NOT NULL,
			  `email` varchar(64) NOT NULL,
			  KEY `user` (`email`)
			) ENGINE=InnoDB DEFAULT CHARSET=latin1;

			--
			-- Dumping data for table `project_users`
			--

			INSERT INTO `project_users` (`id`, `email`) VALUES
			(2, 'mads@fe.up.pt'),
			(2, 'joaonice@gmail.com'),
			(5, 'v@gmail.com'),
			(20, 'a@a.a'),
			(21, 'coiso@fe.up.pt'),
			(23, 'mads@fe.up.pt'),
			(24, 'mads@fe.up.pt'),
			(25, 'mads@fe.up.pt'),
			(27, 'ei07089@fe.up.pt');

			-- --------------------------------------------------------

			--
			-- Table structure for table `tasks`
			--

			DROP TABLE IF EXISTS `tasks`;
			CREATE TABLE IF NOT EXISTS `tasks` (
			  `id` int(11) NOT NULL auto_increment,
			  `name` varchar(64) NOT NULL,
			  `user` varchar(64) default NULL,
			  `idproj` int(11) NOT NULL,
			  `idsprint` int(11) NOT NULL,
			  `sprintdone` int(11) NOT NULL default '0',
			  `priority` int(11) NOT NULL,
			  `effort` int(11) NOT NULL,
			  PRIMARY KEY  (`id`)
			) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

			--
			-- Dumping data for table `tasks`
			--

			INSERT INTO `tasks` (`id`, `name`, `user`, `idproj`, `idsprint`, `sprintdone`, `priority`, `effort`) VALUES
			(1, 'Criar Login', 'null', 2, 1, 0, -157, 433),
			(2, 'Criar User', 'null', 2, 1, 0, -34, -2),
			(3, 'Criar Projeto', 'joaonice@gmail.com', 2, 1, 0, 67, 481),
			(4, 'Listar Projeto', 'joaonice@gmail.com', 2, 1, 0, -160, -233),
			(5, 'Adicionar User Projeto', 'joaonice@gmail.com', 2, 1, 0, -174, 153),
			(6, 'Criar Tarefa', 'null', 2, 1, 0, 143, 26),
			(7, 'Backlog Lista', 'null', 2, 1, 0, -157, -469),
			(8, 'teste', 'joaonice', 2, 1, 0, 193, 267),
			(9, 'teste2', 'joaonice', 2, 1, 0, 166, -222),
			(10, ',viacurl', 'joaonice', 2, 1, 0, 97, -448);

			-- --------------------------------------------------------

			--
			-- Table structure for table `users`
			--

			DROP TABLE IF EXISTS `users`;
			CREATE TABLE IF NOT EXISTS `users` (
			  `email` varchar(64) NOT NULL,
			  `pass` varchar(64) NOT NULL,
			  `name` varchar(128) NOT NULL,
			  PRIMARY KEY  (`email`)
			) ENGINE=InnoDB DEFAULT CHARSET=latin1;

			--
			-- Dumping data for table `users`
			--

			INSERT INTO `users` (`email`, `pass`, `name`) VALUES
			('a@a.a', '11', 'aaa'),
			('coiso@fe.up.pt', '12345', 'lololo'),
			('ei07089@fe.up.pt', '12345', 'Tiago'),
			('joaonice@gmail.com', 'lol', 'j'),
			('mads@fe.up.pt', '12345', 'MADS 2011'),
			('v@gmail.com', '11', 'vasco');";

	foreach(explode(';', $query) as $value)
	{
		if($value == '')
			continue;
		mysql_query($value) or die('{"status":"error"}' . mysql_error());
	}

	echo '{"status":"ok"}';


?>
