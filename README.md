# Project Management Tool

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

A project management tool where users can create, update, and track the progress of various projects as a whole and tasks within those projects. It uses PostgreSQL for the database, Express for the backend (routing and linking to the database), Vite/React for the frontend, and Node.js to link it all together. This is a practical and relevant app that I hope to utilise going forward whilst working on both personal and professional projects. Originally this was made as my final project for [Codecademy's](https://codecademy.com) 'Full-Stack Engineer' course as it is a complete app utilising a PERN stack and showcases a range of skills acquired from completing the course.

**Checkout the live version at [NJTD.xyz](https://final.njtd.xyz)**

## Main areas of consideration

- [ ] Branding/Frontend - Vite
- [ ] Database/Backend
- [ ] Managing state - Redux?
- [ ] Express Server
- [ ] Swagger docs
- [ ] API routes
- [ ] Authentication allowing saving of sessions
- [ ] AI integration

## Key Functionalities

- [ ] Ability to track multiple projects
- [ ] Within projects, ability to track multiple tasks
- [ ] Able to share with a team and designate roles
- [ ] Tasks should be fully editable/updateable
- [ ] Ability to add pictures to projects and tasks
- [ ] Calendar view that shows upcoming end dates for individual tasks and overall projects
- [ ] Set targets / assign tasks to targets
- [ ] Implement some AI functionality to offer advice for completing tasks or reorganising the workflow in a more logical order

## Characterstics

- ### Project

  - Team:
    - Each member with their own permissions
    - Members will be an instance of user
  - Start date
  - End date
  - Tasks

- ### Task

  - Start date
  - End date
  - Title
  - Overview
  - Priority
  - Color coded which automatically changes as deadline approaches
  - AI Overview:
    - Technologies involved
    - acheivability
    - advice

- ### User

  - Permissions:
    - Edit their own tasts and projects
    - Edit other peoples? (admin)
    - Assign tasks
    - Invite others into team
  - Role:
    - Admin
    - standard user
  - Username
  - Password
  - email
  - Profile photo
  - Introduction
  - Achievments
  - Completed projects/tasks
  - Timeline

### Structure

- backend: Express + pg backend. Run `npm install` then `npm run dev`.
- frontend: Vite + React frontend. Run `npm install` then `npm run dev`.

### Development notes

- Copy `backend/.env.example` to `backend/.env` and set your `DATABASE_URL`.
- Create the `users` table (see `backend/README.md`).
- You can run the backend on port 5000 and the frontend on 5173. In development set `VITE_API_URL` in `frontend/.env` to `http://localhost:5000` if needed.
