![Comic Companion](./ReadmeAssets/readme-header.png)

# Comic Companion

Comic Companion is the go-to app for the ultimate comic reading experience. Dive into the latest weeklies or explore timeless classics spanning decades. But we're more than just comics – create and share personalized reading lists, connecting with fellow enthusiasts. Whether you're a seasoned fan or a newcomer, Comic Companion is your portal to a world of superheroes and villains.

**Comic Companion is currently under beta. If you encounter any issues or have any feature requests, please submit them on the [Github Issues Page](https://github.com/CalvinPVIII/ComicCompanion.Solution/issues)**

## Comic Companion is available in these formats:

- Android Mobile App
- Web App
- REST API

### [Download the Mobile App](https://github.com/CalvinPVIII/ComicCompanion.Solution/releases)

### [Visit the Web App](https://comiccompanion.netlify.app/)

### [View API Documentation](https://docs-comicompanion.netlify.app/)

## Technologies Used:

- C#
- ASP.NET
- EF Core
- TypeScript
- React
- Redux Tool Kit
- Ionic Capacitor
- Postgresql

## Local Setup

- Clone this repository using the command `git clone https://github.com/CalvinPVIII/ComicCompanion.Solution`

### Setting up the API locally

Requirements:

- [.NET 7](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [Postgresql](https://www.postgresql.org/download/)

Instructions:

- From the top level directory of the project, navigate to the API folder using the command `cd ComicCompanion`
- Install necessary dependencies using the command `dotnet restore`
- In the `ComicCompanionFolder`, create a file called `appsettings.json`
- In the `appsettings.json` file, paste this code:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=5432;Database=comiccompanion;User Id={your-user-name};Password={your-password}"
  },
  "JWT": {
    "ValidAudience": "ComicCompanion",
    "ValidIssuer": "ComicCompanion",
    "Secret": "{your-secret-key}"
  }
}
```

_Note: Be sure to replace {your-user-name} and {your-password} with your Postgresql user info. Additionally, {your-secret-key} should be at least 16 characters long_

- To setup the database, run the command `dotnet ef database update`

- To build the project, run the command `dotnet build`

- To run the project in a local server, run the command `dotnet run`, or `dotnet watch run` for hot reloading

### Setting up the web app locally:

Requirements:

-[NodeJS version 18 or later](https://nodejs.org/en/download)

Instructions:

- From the root directory, `ComicCompanion.Solution`, navigate to the Client directory using the command `cd ComicCompanionClient`
- Install dependencies using the command `npm install`
- To build the project, run the command `npm run build`
- To run the project in a dev server, run the command `npm run dev`

### Setting up the android app locally:

Requirements:

- [Android Studio](https://developer.android.com/studio)
- [NodeJS version 18 or later](https://nodejs.org/en/download)

Instructions:

- Follow the previous setup instruction for running the web app locally. You do not need to run the dev server
- Initialize the android project files by running the command `npx cap app android`
- Set the custom app icon and splash screen by running the command `npx capacitor-assets generate`
- Build the app by running the command `npm run build`
- Sync the mobile and previously built web app by running the command `npx cap sync`
- Open the app in Android Studio using the command `npx cap open android`
- To run the app directly from the CLI on an emulator or connected device, run the command `npx cap run android`

  _For more information or troubleshooting steps, visit the [Capacitor Android docs](https://capacitorjs.com/docs/android)_

### For bug reports and feature requests, please [submit an issue on Github](https://github.com/CalvinPVIII/ComicCompanion.Solution/issues)

### _Version: Beta 1.4_

_Licensed under GPLv3_

_Disclaimer: Comic Companion is a non profit app, and does not host or otherwise earn any revenue from the content displayed on the app. All content comes from third party sources. Please contact appropriate sources for removal_
