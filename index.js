#!/usr/bin/env node

if (process.argv.length < 3)
{
	console.log("usage: get-latest-activator.js service_name [debug_port]");
	console.log("options:");
	console.log("  service_name: Name of the service for which you want activator parameters.");
	console.log("  [debug_port]: Port number on which we want debugging to be enabled.")
	console.log("                By default debugging is disabled.");
	return;
}

function getServiceName(services)
{
	var name = "CATO_FRONTEND";

	if (process.argv.length >= 3)
	{
		var inputName = process.argv[2];
		if (services.hasOwnProperty(inputName))
		{
			console.log("Using service name: ", inputName);
			name = inputName;
		}
		else
		{
			console.log("Invalid service name: ", inputName, ". Using default: ", name);
		}
	}
	else
	{
		console.log("No service name specified. Using default: ", name);
	}

	return name;
}

var clipboard = require("copy-paste");
var fs = require("fs");
var path = require("path");

var servicesPath = path.join(process.env.WORKSPACE, "service-manager-config/services.json");
console.log("\n" + servicesPath);

var services = JSON.parse(fs.readFileSync(servicesPath, "utf8"));
var command = "activator";

var serviceName = getServiceName(services);
var catoConfig = services[serviceName].binary.cmd;

for (var index = 0; index < catoConfig.length; index++)
{
	var param = catoConfig[index];
	if (param.indexOf("-Dapplication") == -1 && param.indexOf("-Dfeature") == -1)
		continue;

	command += " " + param;
}

if (process.argv.length >= 4)
{
	command += " -jvm-debug " + process.argv[3];
}

console.log(command);
clipboard.copy(command, function ()
{
	console.log("Script copied to clipboard.\n");
});