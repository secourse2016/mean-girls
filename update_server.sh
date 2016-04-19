 $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
nvm use 5.9
if [ ! -d "$APP" ]; then
   git clone "$REPO_URL" "$APP"
   cd "$APP"
else
   cd "$APP"
   git pull origin master -f
fi

npm install
cd ..
pm2 stop all
pm2 start "$APP"

exit 0
