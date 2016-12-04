CREATE TABLE `retrospective` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `positive` tinyint(4) NOT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

ALTER TABLE `retrospective`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `retrospective`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
