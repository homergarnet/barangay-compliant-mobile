How to install ionic:
npm install -g ionic
---------------------------------------------------------------------------------------------------------------
how to create project in ionic
//you can change tabs to blank, or sidemenu
ionic start myApp tabs --type=angular
---------------------------------------------------------------------------------------------------------------
how to run the app in ionic
ionic serve

---------------------------------------------------------------------------------------------------------------
how to install cordova
npm install -g cordova
---------------------------------------------------------------------------------------------------------------
to install the node_modules and missing files just type in the command prompt (TAKE NOTE: IT MUST BE IN YOUR market-placee folder):

npm install  --legacy-peer-deps
----------------------------------------------------------------------------------------------------------------------------------------
Error fix solutions:

"ng : File C:\Users\lenovo\AppData\Roaming\npm\ng.ps1 cannot be loaded because running scripts is disabled on this system. For mo see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.""
1.)open the powershell run it on administrator then type the following line:
  Set-ExecutionPolicy -ExecutionPolicy Unrestricted
----------------------------------------------------------------------------------------------------------------------------------------
types of account:
1.)admin
2.)barangay
3.)compliant
----------------------------------------------------------------------------------------------------------------------------------------
types of routing in layout:
1.)admin
2.)barangay
3.)compliant
4.)user-auth
5.)admin-auth
6.)barangay-auth
----------------------------------------------------------------------------------------------------------------------------------------
Type of Statuses:

1.) active
2.) fake report
3.) resolved
4.) in progress
5.) investigation
6.) completed
7.) closed
----------------------------------------------------------------------------------------------------------------------------------------
vs code extensions for angular:

1.) Angular Language Service
2.) Angular Snippets (Version 13)
3.) Auto Close Tag
4.) Auto Complete Tag
5.) Auto Rename Tag
6.) Bracket Pair Colorization Toggler
7.) GitLens — Git supercharged
----------------------------------------------------------------------------------------------------------------------------------------
ionic auto generate commands:

ionic g page auth-screens/intro
ionic g --help (for list of auto generation commands)
//common used on a day to day task: 
ng g customer --inline-style (No css or scss file)
ng g c supplier --inline-template (No html file)
ng g c user --inline-style --inline-template (No css and No html file)
ng g module user-auth (moudle.ts file only)
ng g module pages --routing (module and routing)
ng generate guard guard-name (for generating guards)
ng g s services/your-service-name (for generating services)
----------------------------------------------------------------------------------------------------------------------------------------
how to upload angular project in aws
1.) ng build --configuration production
----------------------------------------------------------------------------------------------------------------------------------------
how to uninstall node_module
npm uninstall <node_module_name_here> --save
example
npm uninstall ngx-gallery --save

----------------------------------------------------------------------------------------------------------------------------------------
how to install chart.js
first install the 2 npm packages (TAKE NOTE: It should be same version)
npm i chart.js@2.9.4
npm i --save-dev @types/chart.js
after installing, copy and paste the sample code in shared folder

----------------------------------------------------------------------------------------------------------------------------------------
