clear
printf "Alright, let's get you setup.\n"
sleep 2s
printf "\nFirst, let's create your discord bot.\n"
sleep 3s
printf "\nIn order to do this, navigate to the discord developer portal > Applications. (Will open automatically)\n"

if [ -n $BROWSER ]; then
  $BROWSER 'https://discord.com/developers/applications'
elif which xdg-open > /dev/null; then
  xdg-open 'https://discord.com/developers/applications'
elif which gnome-open > /dev/null; then
  gnome-open 'https://discord.com/developers/applications'
# elif bla bla bla...
else
  printf "\nCould not detect the web browser to use.\n"
fi

sleep 3s
printf "\nI'll give you a bit to login, don't worry.\n"
sleep 5s
printf "\nAlright, you should be ready by now.\n"
sleep 2s
printf "\nIf not don't worry, we're gonna go slow from here on."
sleep 5s

clear

printf "Select 'New Application' at the top right of the site\n"
sleep 5s
printf "\nEnter the name for your bot, (of your choice)\n"
sleep 3s
printf "\nThen click 'Create'"
sleep 3s

clear

printf "Navigate to 'Bot' on the left side of the website\n"
sleep 2s
printf "\nClick 'Add Bot' on the right under 'Build-A-Bot'\n"
sleep 2s
printf "\nSelect 'Yes, do it!'\n"
sleep 2s
# Add token prompt and directions here
printf "\nAfterwards you can come back here to customize your bot."
sleep 4s

clear

printf "But right now, we have to set this up.\n"
sleep 3s
printf "\nCheck 'PRESENCE INTENT' on\n"
sleep 5s
printf "Check 'SERVER MEMBERS INTENT' on\n"
sleep 5s
printf "Check 'MESSAGE CONTENT INTENT' on"
sleep 5s

clear

printf "Now, click 'OAuth2' on the left sidebar.\n"
sleep 3s
printf "\nNow click the new 'URL Generator' option which should have appeared below it.\n"
sleep 5s
printf "\nSelect the options:\n"
sleep 1s
printf "\napplications.commands\n"
sleep 1s
printf "bot\n"
sleep 3s
printf "\nAnd 'Administrator' which should have appeared in a menu below."
sleep 6s

clear

printf "Scroll down to the bottom and click 'Copy' on the generated URL.\n"
sleep 3s
printf "\nNow invite this bot to your server, although it won't work just yet.\n"
