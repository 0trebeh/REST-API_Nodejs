create database forms;

create table app_user (
	user_id serial PRIMARY KEY,
	username VARCHAR (60) UNIQUE NOT NULL,
	avatar VARCHAR (600),
	email VARCHAR (255) UNIQUE NOT NULL,
	password VARCHAR (120) NOT NULL,
  admin boolean DEFAULT false
);

create table menu (
	menu_id serial PRIMARY KEY,
	title_menu VARCHAR (160) NOT NULL,
	user_id integer NOT NULL,
	submenu integer,
	FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (submenu)
        REFERENCES menu (menu_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

/* 
WITH RECURSIVE ctemenu AS (
      SELECT menu_id, title_menu, submenu
      FROM menu
      WHERE menu_id = 1
   UNION ALL
      SELECT menu.menu_id, menu.title_menu, menu.submenu
      FROM menu
         JOIN ctemenu ON menu.submenu = ctemenu.menu_id
) SELECT * FROM ctename LIMIT 30;
*/
/*
WITH RECURSIVE ctemenu AS (
        SELECT menu_id, title_menu, submenu
        FROM menu
        WHERE menu_id = 1
    UNION ALL
        SELECT menu.menu_id, menu.title_menu, menu.submenu
        FROM menu
          JOIN ctemenu ON menu.submenu = ctemenu.menu_id
  ) SELECT ctemenu.menu_id, ctemenu.title_menu, ctemenu.submenu, form.form_id, form.menu_id, form.title_form, form.description_form, form.random_order, form.send_alert, form.locked FROM ctemenu FULL OUTER JOIN form on ctemenu.menu_id = form.menu_id;
*/

SELECT E1.EmployeeID
FROM Employees E1 JOIN Employees E2 ON E1.Sueldo > E2.Sueldo
WHERE E2.EmployeeID = 5


create table form (
	form_id serial PRIMARY KEY,
	menu_id integer NOT NULL,
	title_form VARCHAR (100) NOT NULL,
	description_form VARCHAR (800),
  random_order boolean DEFAULT false,
  send_alert boolean DEFAULT false,
  locked boolean DEFAULT false,
	created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (menu_id)
        REFERENCES menu (menu_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

create table type_question (
  tq_id serial PRIMARY KEY,
  selection boolean DEFAULT false,
  text boolean DEFAULT false,
  numeric boolean DEFAULT false,
  checklist boolean DEFAULT false,
  drop_down_list boolean DEFAULT false,
  question_id integer NOT NULL, 
  FOREIGN KEY (question_id) 
        REFERENCES question (question_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

create table question (
  question_id serial PRIMARY KEY,
  form_id integer NOT NULL,
  title_q VARCHAR (100) NOT NULL,
  description_q VARCHAR (800),
  value varchar (800),
  response_size integer,
  required boolean DEFAULT false,
  FOREIGN KEY (form_id)
        REFERENCES form (form_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
);

create table answer (
  answer_id serial PRIMARY KEY,
  question_id integer NOT NULL,
  user_id integer NOT NULL,
  value varchar (1500),
  FOREIGN KEY (question_id)
      REFERENCES question (question_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (user_id)
        REFERENCES app_user (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);