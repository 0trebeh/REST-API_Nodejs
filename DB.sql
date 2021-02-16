create database forms;

create table forms (
	forms_id serial PRIMARY KEY,
	title VARCHAR (30) NOT NULL,
	description VARCHAR (300),
	user_id INT NOT NULL,
	FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);

create table users (
	user_id serial PRIMARY KEY,
	username VARCHAR (30) UNIQUE NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	password VARCHAR (30) NOT NULL
);
insert into users (username, email, password) values ('Otrebeh','hebertourribarri2@gmail.com','cosafea');

create table form_slot (
	fs_id serial PRIMARY KEY,
	forms_id INT NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (forms_id
        REFERENCES forms (forms_id),
	FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);
