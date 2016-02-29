# sm-helper
This is a small command-line tool for getting activator start scripts for HMRC services.

# Pre-requisites
In order for this tool to work you need "WORKSPACE" environment variable to be set as per confluence page.
In that directory you must have "service-manager-config" git repository (it is recommended to have it updated with latest changes).
And lastly - Node.js (obviously).

# Installation
To install the tool run following command:
```
npm install -g sm-helper
```

# Usage
To get a startup script run following command:
```
sm-helper CATO_FRONTEND
```

This will generate (and copy to clipboard!) a script similar to this one:
```
activator -Dapplication.router=testOnlyDoNotUseInAppConf.Routes -Dfeature.cato1764LongPeriodOfAccounts=true -Dfeature.catoCt600v3=true -Dfeature.cato1463attachments=true -Dfeature.catoCharities=true

```

The tool also allows to create startup script with debugging enabled.

To do that run following command:
```
sm-helper CATO_FRONTEND 9999
```

In this case the debugger port is 9999 but you can set it to anything you like as long as the port is available on your computer.
The result will be copied to your clipboard and will be similar to this:
```
activator -Dapplication.router=testOnlyDoNotUseInAppConf.Routes -Dfeature.cato1764LongPeriodOfAccounts=true -Dfeature.catoCt600v3=true -Dfeature.cato1463attachments=true -Dfeature.catoCharities=true -jvm-debug 9999
```