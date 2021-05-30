# rosecity-pools-frontend

[Rose City Pools](https://rosecitypools.info) is my first foray into the world of web development. It has conveniently served two purposes: to begin my journey as a web developer, and to provide a useful tool for an annual NHL playoffs fantasy league that has taken place for over a decade.

## History

### Iteration 1

For the first several years, the fantasy league consisted of a few high school students drafting teams in a living room at Darren's house (no introduction necessary) in Welland ON (the Rose City). We'd eat pizza, cross off players from printed out lists, record our teams on paper, and update game stats by hand on a nightly basis. Standings were communicated regularly via email.

### Iteration 2

The second iteration involved the use of Google Sheets for tracking the teams, and manual stat updates. Eventually we got tired of manually updating the player points, so I took it upon myself to develop an automated solution. Using python and the requests library, I scraped data from nhl.com and updated the stats in the Google Sheets on a regular basis. Although it was run on a schedule, it required my laptop to always be running.

### Iteration 3

Introducing [rosecitypools.info](https://rosecitypools.info)!


## Front End Description

[rosecitypools.info](https://rosecitypools.info) is a [Gatsby](https://www.gatsbyjs.com/) site developed using [React](https://reactjs.org/). The goal was to learn React (and Javascript in general) so the development framework had to be Javascript based. My original plan was to start with a blog-type website, so I focused on Gatsby due to its popularity as a static site generator. Once I switched my project to the fantasy sports website, I just stuck with Gatsby since I already had gone through some of its tutorials. Ultimately I just wanted to start something. The intent wass a learning experience and I learn best by doing!

### Stack

- Front end: Gatsby (React)
- [Back end: Node.js (Express)](https://github.com/bkaas/rosecity-pools-backend)
- Database: PostgreSQL
- Server: Nginx / Ubuntu server, hosted on a Digital Ocean droplet.

## Usage

### [Home Page](https://rosecitypools.info/)

The proper way to use the home page is to immediately redirect your eyes away from the hastily hacked together logo.

### [Teams](https://rosecitypools.info/teams)

The teams page displays each fantasy team roster in the league along with the number of points for each player. The only stat tracked for this league is playoff points. There is also a list of the league standings and the ability to sort the teams in different ways.

**Future Growth:**
- Once there is data for multiple years (and even multiple leagues??), a filter to select which year and which league will be added.

### [Draft](https://rosecitypools.info/draft)

The intention of the draft page is to provide a platform where all of the league members can draft their teams virtually, similar to other fantasy sports platforms. Unfortunately the draft page wasn't completed in time for the 2021 playoffs draft so we opted for Google Sheets for recording the teams. I successfully used the draft page to populate the PostgreSQL database with the draft results after the draft had taken place, using the page as if we had drafted live.

#### Usage

The draft page requires a login with the intention of allowing only users drafting for a specific league on the page together. There is an admin password and a regular user password. The admin has the ability to:
- select the league that is drafting
- create teams
- adjust the order the teams will draft
- begin the draft, undo picks
- reconfigure team order after the draft started
- and submit the results to the database.

Each user has access to a simple form (with an autocomplete function) for selecting players to draft. Each player is entered into a table so all users can track their teams.

>**_Note:_** The submit draft button has purposely been disabled to prevent extra unwanted data accidentally added to the database.

**Future Growth**
- Changes to the draft page are only viewed by the user who makes the change (client side state changes in React). The fundamental implementation needs to be altered to use WebSockets (or similar) so all users can draft their teams and follow along with the simultaneously.
- Draft page password implementation is very basic and is not secure. A more secure implementation is required.
- The draft type is snaked by default (draft order reverses each round). Add an option to toggle this feature.
- Add team logos to the draft table.

