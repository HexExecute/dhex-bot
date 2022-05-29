# DHex Bot

An all in one open source discord bot.

<br><br>

## Setup
*IMPORTANT: (make sure you have git installed)*<br>
In order to setup the bot run this in your terminal of choice. This will open up the setup prompt,<br>
```git clone https://github.com/HexExecute/dhex-bot.git; cd dhex-bot; bash setup.sh```<br>
this prompt will walk you through the setup process of the discord bot.<br>
Giving you recommendations, and setting up your config as you go.

<br><br>

### config.json
```
{
  "client": {
    "token": "your discord bot token",
    "options": {
      "intents": 32767
    }
  },
  "commands": {
    "directory": "Commands/"
  },
  "events": {
    "directory": "Events/"
  },
  "general": {
    "guildID": "your guild ID"
  },
  "api": {
    "password": "your dashboard password",
    "port": 3000
  },
  "roles": {
    "muteRole": "your mute role"
  },
  "database": {
    "mongoDB": "your mongo link"
  }
}

```
