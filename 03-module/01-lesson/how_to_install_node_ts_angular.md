# How to Install NodeJS, TypeScript, and Angular CLI Tools

Why all of these? Angular is built on TypeScript, and so the TypeScript CLI (command line interface) tool is used in the background to convert JavaScript to TypeScript.

Installing Node will also install NPM, or Node Package Manager. This is used to install dependencies in your project - Angular being one of them! You can use the `npm install` command to install just about anything you want into your application.

## NodeJS
* Head to the [NodeJS downloads page](https://nodejs.org/en/download/) and download the relevant installer for your operating system.
* Go through the installer prompts.
* Open a terminal (Mac) or PowerShell (Windows) and verify the installation with `node -v` to log the version number.
* This will also have installed NPM; verify this with `npm -v` to log the version number.

## TypeScript
* Now with `npm` installed, you can run `npm install -g typescript` ([Offical NPM TypeScript instructions](https://www.npmjs.com/package/typescript)). The `-g` flag means that it will be installed globally (as opposed to locally in a specific project).
* Verify the installation by running `tsc -v` in your terminal/PowerShell. `tsc` is the abbreviation for TypeScript used on the command line.
* If you'd like to dive into the offical TypeScript tutorials, [head to this link](https://www.typescriptlang.org/docs/tutorial.html).

## Angular
* Run `npm install -g @angular/cli`.
* Verify the installation with `ng -v`. `ng` is the abbreviation for Angular used on the command line. You'll also see `ng` used often in other places within Angular development.


With that, you're ready to go!

To create a new Angular application, open a terminal/PowerShell where you'd like to create an Angular app, and run `ng new <YourAppName>`!

From there, `cd` into the newly created app folder by running `cd <YourAppName>`.

Lastly, run `ng serve` to spin up a development server, open `localhost:4200` to see your app running, and start developing!