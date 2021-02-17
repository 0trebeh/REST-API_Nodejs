create database forms;

insert into users (username, avatar, email, password) values ('Otrebeh', NULL,'hebertourribarri2@gmail.com','kakaguate');

insert into menu (title, user_id, submenu) values ('menu de heberto', 1, NULL);

insert into forms (menu_id, title, description, url) values (1, 'formulario del menu de heberto', NULL, NULL);

insert into text (title) values ('cancion de bob sponja');

insert into form_slot (forms_id, selection_id, text_id, numeric_id) values (1, NULL, 1, NULL);

insert into short_answer (value, text_id) values ('cacahuate rock', 1);

create table users (
	user_id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	avatar VARCHAR (600),
	email VARCHAR (255) UNIQUE NOT NULL,
	password VARCHAR (60) NOT NULL,
	token_validation VARCHAR (30)
);

create table menu (
	menu_id serial PRIMARY KEY,
	title VARCHAR (100) NOT NULL,
	user_id integer NOT NULL,
	submenu integer,
	FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (submenu)
        REFERENCES menu (menu_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table forms (
	forms_id serial PRIMARY KEY,
	menu_id integer NOT NULL,
	title VARCHAR (100) NOT NULL,
	description VARCHAR (800),
	url VARCHAR (1000),
	created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (menu_id)
        REFERENCES menu (menu_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table selection (
	selection_id serial PRIMARY KEY,
	title VARCHAR (100) NOT NULL
);

create table text (
	text_id serial PRIMARY KEY,
	title VARCHAR (100) NOT NULL
);

create table numeric (
	numeric_id serial PRIMARY KEY,
	title VARCHAR (100) NOT NULL
);

create table form_slot (
	fs_id serial PRIMARY KEY,
	forms_id integer NOT NULL,
	selection_id integer,
	text_id integer,
	numeric_id integer,
	FOREIGN KEY (forms_id)
        REFERENCES forms (forms_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (selection_id)
        REFERENCES selection (selection_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (text_id)
        REFERENCES text (text_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (numeric_id)
        REFERENCES numeric (numeric_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE           
);

create table multiple_choice (
	mc_id serial PRIMARY KEY,
	selection_id integer NOT NULL,
	FOREIGN KEY (selection_id)
        REFERENCES selection (selection_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
);

create table simple_selection (
	ss_id serial PRIMARY KEY,
	value VARCHAR (800),
	selection_id integer NOT NULL,
	FOREIGN KEY (selection_id)
        REFERENCES selection (selection_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
);

create table number (
	number_id serial PRIMARY KEY,
	value integer,
	numeric_id integer NOT NULL,
	FOREIGN KEY (numeric_id)
        REFERENCES numeric (numeric_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
);

create table date (
	date_id serial PRIMARY KEY,
	value date,
	numeric_id integer NOT NULL,
	FOREIGN KEY (numeric_id)
        REFERENCES numeric (numeric_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
);

create table time (
	time_id serial PRIMARY KEY,
	value time,
	numeric_id integer NOT NULL,
	FOREIGN KEY (numeric_id)
        REFERENCES numeric (numeric_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
);

create table short_answer (
	sa_id serial PRIMARY KEY,
	value VARCHAR (800),
	text_id integer NOT NULL,
	FOREIGN KEY (text_id)
        REFERENCES text (text_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
);

create table long_answer (
	la_id serial PRIMARY KEY,
	value VARCHAR (5000),
	text_id integer NOT NULL,
	FOREIGN KEY (text_id)
        REFERENCES text (text_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE 
);

create table choices (
	choices_id serial PRIMARY KEY,
	value VARCHAR (800),
	mc_id integer NOT NULL,
	FOREIGN KEY (mc_id)
        REFERENCES multiple_choice (mc_id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE 
);

/*
forms=# select * from menu;
 menu_id |      title      | user_id | submenu
---------+-----------------+---------+---------
       1 | menu de heberto |       1 |
       2 | primer submenu  |       1 |       1
       3 | segundo submenu |       1 |       1
(3 filas)


forms=# select * from menu where submenu = 1;
 menu_id |      title      | user_id | submenu
---------+-----------------+---------+---------
       2 | primer submenu  |       1 |       1
       3 | segundo submenu |       1 |       1
(2 filas)


forms=# select * from forms where menu_id = 1;
 forms_id | menu_id |             title              | description | url |          created_on
----------+---------+--------------------------------+-------------+-----+-------------------------------
        1 |       1 | formulario del menu de heberto |             |     | 2021-02-16 19:09:08.175036-04
(1 fila)


forms=# select * from form_slot where forms_id = 1;
 fs_id | forms_id | selection_id | text_id | numeric_id
-------+----------+--------------+---------+------------
     1 |        1 |              |       1 |
(1 fila)


forms=# select * from text where text_id = 1;
 text_id |         title
---------+-----------------------
       1 | cancion de bob sponja
(1 fila)


forms=# select * from short_answer where text_id = 1;
 sa_id |     value      | text_id
-------+----------------+---------
     1 | cacahuate rock |       1
(1 fila)
*/