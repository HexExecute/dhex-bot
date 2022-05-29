clear
touch config.json
cat > config.json << EOF
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
EOF
printf "%s " "Alright, let's get you setup."
read ans
printf "\n"
printf "%s " "First, let's create your discord bot."
read ans
printf "\n"
printf "%s " "In order to do this, navigate to the discord developer portal > Applications. (Will open automatically)"
read ans

if [ -n $BROWSER ]; then
  $BROWSER 'https://discord.com/developers/applications'
elif which xdg-open > /dev/null; then
  xdg-open 'https://discord.com/developers/applications'
elif which gnome-open > /dev/null; then
  gnome-open 'https://discord.com/developers/applications'
# elif bla bla bla...
else
  printf "\nCould not detect the web browser to use.\n"
  exit
fi

clear

printf "%s " "Now login."
read ans
printf "\n"
printf "%s " "Select 'New Application' at the top right of the site."
read ans
printf "\n"
printf "%s " "Enter the name for your bot, (of your choice)"
read ans
printf "\n"
printf "%s " "Then click 'Create'."
read ans

clear

printf "%s " "Navigate to 'Bot' on the left side of the website."
read ans
printf "\n"
printf "%s " "Click 'Add Bot' on the right under 'Build-A-Bot'."
read ans
printf "\n"
printf "%s " "Select 'Yes, do it!'."
read ans
printf "\n"
# Add token prompt and directions here
printf "%s " "Afterwards you can come back here to customize your bot."
read ans

clear

printf "%s " "But right now, we have to set this up."
read ans
printf "\nCheck 'PRESENCE INTENT' on.\n"
sleep 1s
printf "Check 'SERVER MEMBERS INTENT' on.\n"
sleep 1s
printf "Check 'MESSAGE CONTENT INTENT' on.\n\n"
sleep 1s
printf "%s " "Once you've finished, press enter to continue."
read ans

clear

printf "%s " "Now, click 'OAuth2' on the left sidebar."
read ans
printf "\n"
printf "%s " "Now click the new 'URL Generator' option which should have appeared below it."
read ans
printf "\n"
printf "%s " "Select the options:"
read ans
printf "\napplications.commands\n"
sleep 1s
printf "bot\n"
sleep 1s
printf "\nAnd 'Administrator' which should have appeared in a menu below.\n\n"
sleep 2s
printf "%s " "When you've finished, press enter to continue."
read ans

clear

printf "%s " "Scroll down to the bottom and click 'Copy' on the generated URL."
read ans
printf "\n"
printf "%s " "Now invite this bot to your server, although it won't work just yet."
read ans

clear
