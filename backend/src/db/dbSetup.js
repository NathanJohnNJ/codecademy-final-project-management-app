const db = require('../db/connection');

async function setupDatabase(){
  try {
    await db.query('CREATE DATABASE IF NOT EXISTS projectmanagementdb');
    await db.query('DROP TABLE IF EXISTS tasks;');
    await db.query('DROP TABLE IF EXISTS users;');
    await db.query('DROP TABLE IF EXISTS teams;');
    await db.query('DROP TABLE IF EXISTS projects;');
    await db.query('CREATE TABLE IF NOT EXISTS tasks ( id serial NOT NULL, title character varying(50) NOT NULL, notes text, priority priority, completed boolean NOT NULL DEFAULT false, due_date date, created_date date NOT NULL, project_id integer, team_id integer, user_ids integer[], CONSTRAINT tasksd_pkey PRIMARY KEY (id))');
    await db.query('CREATE TABLE IF NOT EXISTS projects (id serial NOT NULL, title character varying(50) NOT NULL, notes text, completed boolean NOT NULL DEFAULT false, due_date date, created_date date NOT NULL, task_ids integer[], team_ids integer[], user_ids integer[], priority priority, project_image integer NOT NULL DEFAULT 1, CONSTRAINT projects_pkey PRIMARY KEY (id))');
    await db.query('CREATE TABLE IF NOT EXISTS users (id serial NOT NULL, user_name character varying(50) NOT NULL, email character varying(100) NOT NULL, password_hash character varying(150) NOT NULL, tasks integer[], teams integer[], projects integer[], profile_image integer DEFAULT 1, CONSTRAINT users_pkey PRIMARY KEY (id))');
    await db.query('CREATE TABLE IF NOT EXISTS teams (id serial NOT NULL, team_name character varying(50) NOT NULL, task_ids integer[], user_ids integer[], project_ids integer[], profile_image integer DEFAULT 1, CONSTRAINT teams_pkey PRIMARY KEY (id))');
  } catch (error){
    console.log('There was an error whilst setting up the database.');
    console.error(error);
  }
}

module.exports = { setupDatabase };