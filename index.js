#!/usr/bin/env node

if (["-h", "--help", "?"].indexOf(process.argv[2]) !== -1)
{
	console.log("usage: sm-helper [service_name] [debug_port]");
	console.log("options:");
	console.log("  [service_name]: Name of the service for which you want activator parameters.");
    console.log("                  By default it will take name of current directory.");
	console.log("  [debug_port]: Port number on which we want debugging to be enabled.");
	console.log("                By default debugging is disabled.");
	return;
}

function getServiceName(services)
{
	var name = null;
    var expectedServiceName = null;

	if (process.argv.length >= 3)
	{
		expectedServiceName = process.argv[2];
	}
	else
	{
        var cwdPath = process.cwd().split(path.sep);
        expectedServiceName = cwdPath[cwdPath.length - 1].toUpperCase().replace(/\-/g, "_");
	}

    if (services.hasOwnProperty(expectedServiceName))
    {
        console.log("Using service name: ", expectedServiceName);
        name = expectedServiceName;
    }
    else
    {
        console.log("Invalid service name: ", expectedServiceName);
    }

	return name;
}

var clipboard = require("copy-paste");
var fs = require("fs");
var path = require("path");

var servicesPath = path.join(process.env.WORKSPACE, "service-manager-config/services.json");
console.log("\n" + servicesPath);

var services = JSON.parse(fs.readFileSync(servicesPath, "utf8"));

var serviceName = getServiceName(services);
if (serviceName !== null)
{
    var command = "sm --stop " + serviceName + "\nactivator";
    if (/^win/.test(process.platform))
    {
        command += " --%";
    }

    var catoConfig = services[serviceName].binary.cmd;

    for (var index = 0; index < catoConfig.length; index++)
    {
        var param = catoConfig[index];
        if (param.indexOf("-Dapplication") == -1 && param.indexOf("-Dfeature") == -1)
            continue;

        command += " " + param;
    }

    command += " -Dhttp.port=" + services[serviceName].defaultPort;

    if (process.argv.length >= 4)
    {
        command += " -jvm-debug " + process.argv[3];
    }

    command += "\nrun\n";

    console.log(command);
    clipboard.copy(command, function ()
    {
        console.log("Script copied to clipboard.\n");
    });
}
