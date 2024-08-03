#### dowload package

```
npm i
```

#

#### run the development server

```
npm run dev
```

#

#### Access the URL

[http://localhost:5173/](http://localhost:5173/)

#

#### Description about LEARING MANAGEMENT

**Overall layout**

- Sidebar: menu for user to navigate to different pages
- Header: log out button
- Assistant: voice assistant (vietnameses): for user to do some work like:
  - Turn on/off dark mode (speak: "Bật chế độ tối / bật chế dộ sáng")
  - Navigate to different pages (speak: "Đến trang chủ / lịch / ghi chú / thông tin cá nhân")

**[Dashboard](http://localhost:5173/dashboard)**

- Welcome box: greeting user, show number of tasks left user need to do
- Doghnut chart: statistics in the number of completed and procesing tasks per day/week
- Bar chart: statistics in the number of studied hours per day and average studied hours per week

**[Schedule](http://localhost:5173/schedule)**

- Show the time table of user, user can click to the cell to see detail, each cell contain:
  - Tasks user need to do in that day
  - Or special event such as: test, presentation,...
  - A button to add task
- Each tasks contains:
  - Checkbox to check the task completed or not
  - Content of the task
  - priority (all tasks is have priority medium as default and can not change, difference priority is considered as special event)
  - A button to deleted task
- Each special event have the same stucture as task, it is only different in priority
  - priority high: presentation, group meeting,...
  - priority special: usually tests or can be something really important to user.

**[Note](http://localhost:5173/notes)**

- Show the button to add note
- Show notes of user, each note contains:
  - Title
  - Content
  - Time
  - Bookmarked
  - Delete button
  - Edit button

**[User](http://localhost:5173/user)**

- Show the personal information about user
- A button to change beeteen light and dark mode

**Others**

- [Log in](http://localhost:5173/login) / [Sign up](http://localhost:5173/signup): page for user to log in and sign up
- [pagenotfound](http://localhost:5173/pagenotfound): show for user when access invalid URL
- [error](http://localhost:5173/error): show for user when the app is error
