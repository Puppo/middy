import { Bench } from "tinybench";
import middy from "../core/index.js";
import middleware from "./index.js";

const bench = new Bench({ time: 1_000 });

const context = {
	getRemainingTimeInMillis: () => 30000,
};
const setupHandler = (options) => {
	const response = JSON.stringify(new Array(100000).fill(0));
	const baseHandler = () => response;
	return middy(baseHandler).use(middleware(options));
};

const gzHandler = setupHandler({ preferredEncoding: "gz" });
const brHandler = setupHandler({ preferredEncoding: "br" });

const event = {};
await bench
	.add("gzip Response", async () => {
		await gzHandler(event, context);
	})
	.add("brotli Response", async () => {
		await brHandler(event, context);
	})
	.run();

console.table(bench.table());
