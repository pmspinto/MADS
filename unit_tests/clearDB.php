<?php
	query = "SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `creationdate` datetime NOT NULL,
  `description` varchar(500) NOT NULL default 'Sem descrição',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `email`, `creationdate`, `description`) VALUES
(1, 'Tutorial 1', 'mads@fe.up.pt', '2011-10-07 10:57:15', ''),
(2, 'MADS', 'mads@fe.up.pt', '2011-10-07 11:05:29', ''),
(5, 'Tutorial', 'v@gmail.com', '2011-10-19 14:40:59', ''),
(20, 'Tutorial', 'a@a.a', '2011-10-19 16:10:46', ''),
(21, 'Tutorial', 'coiso@fe.up.pt', '2011-10-19 17:13:24', ''),
(23, 'Tracker', 'mads@fe.up.pt', '2011-11-21 22:58:29', 'Cena mais robuscada.\nCom paragrafos e nao sei que\nlolol\nloooooool'),
(24, '', 'mads@fe.up.pt', '2011-11-23 11:10:32', ''),
(25, 'lo', 'mads@fe.up.pt', '2011-11-23 14:36:12', 'lol'),
(27, 'Tutorial', 'ei07089@fe.up.pt', '2011-12-18 19:00:07', 'Sem descrição');

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
  `sprintdate` datetime default NULL,
  `completiondate` datetime default NULL,
  `idproj` int(11) NOT NULL,
  `idsprint` int(11) NOT NULL,
  `priority` int(11) NOT NULL,
  `effort` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `user`, `sprintdate`, `completiondate`, `idproj`, `idsprint`, `priority`, `effort`) VALUES
(1, 'Criar Login', 'null', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, -5, 273),
(2, 'Criar User', 'null', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, -1, -2),
(3, 'Criar Projeto', 'joaonice@gmail.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, -25, 468),
(4, 'Listar Projeto', 'joaonice@gmail.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, -146, -193),
(5, 'Adicionar User Projeto', 'joaonice@gmail.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, -179, 224),
(6, 'Criar Tarefa', 'null', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, 120, -12),
(7, 'Backlog Lista', 'null', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, -108, -439),
(8, 'teste', 'joaonice', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, 162, 273),
(9, 'teste2', 'joaonice', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, 168, -222),
(10, ',viacurl', 'joaonice', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2, 1, 15, -403);

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
('v@gmail.com', '11', 'vasco');
";

?>
