import { createCluster } from "../../server";
const { program, InvalidArgumentError } = require("commander");

function myParseInt(value, dummyPrevious?: any) {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        throw new InvalidArgumentError("Not a number.");
    }
    return parsedValue;
}

program.requiredOption("--port <integer>", "port number of the server", myParseInt).requiredOption("--port-range <number...>", "port range of the server");

program.parse();

program._optionValues.portRange = [...new Set(program._optionValues.portRange.map((port) => myParseInt(port)))];

const options: {
    port: number;
    portRange: number[];
} = program.opts();

console.log(options);

createCluster(options.port, { portRange: options.portRange, openOnStart: true });
// TODO: implement the list space
// TODO: implement the keep alive
// TODO: implement the timeout
