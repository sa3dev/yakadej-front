# Yakadej

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
> Note that the server run on `0.0.0.0` so other devices on your network can access it.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Contributing

1. Fetch the last state of the repository `git fetch -p`
2. Create a banch from `origin develop` to do your thing `git checkout MY_BRANCH origin/develop`
3. Do your stuff, commit, push as mush as you want
4. When you're done, open a `pull request` on bitbucket
5. Re-update the repo `git fetch -p`
6. Rebase your work `git rebase -i origin/develop`
7. Force push your branch `git push -f origin MY_BRANCH`
8. Set the name of the PR to the angular convention (`WHY(WHAT): HOW` example: `fix(home): Login now redirect`)
9. Once ok, you can merge

## Deploying

> You'll need to have `make`, `scp` and `zip` installed 
> You'll need to have `yakadej` ssh key configured 

1. In project root run `make package CONF={prod|preprod}` for example `make package CONF=preprod` to build the project in `preproduction` mode.
2. Once the project is built, you'll have a `zip` file name `yakadej-front.zip` in the `dist` folder, copy it on the server
3. `scp dist/yakadej-front.zip yakadej:/var/www/html/yakadej_v2/{prod|preprod}/front` for example `scp dist/yakadej-front.zip yakadej:/var/www/html/yakadej_v2/preprod/front` to copy the folder in `preprod`
4. Log on the server `ssh yakadej`
5. Go to the folder `cd /var/www/html/yakadej_v2/{prod|preprod}/front`
6. Unzip the package `unzip yakadej-front.zip` and allow overwrite for all `A`
7. Replace everything `cp -r dist/yakadej/* .`

You're done.
