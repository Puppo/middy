import type middy from "@middy/core";
import type { MiddyfiedHandler } from "@middy/core";
import type {
	ALBEvent,
	ALBResult,
	APIGatewayProxyEvent,
	APIGatewayProxyEventV2,
	APIGatewayProxyResult,
	APIGatewayProxyResultV2,
	Handler as LambdaHandler,
} from "aws-lambda";

export type Method =
	| "GET"
	| "POST"
	| "PUT"
	| "PATCH"
	| "DELETE"
	| "OPTIONS"
	| "HEAD"
	| "ANY";

export interface Route<TEvent, TResult> {
	method: Method;
	path: string;
	handler:
		| LambdaHandler<TEvent, TResult>
		| MiddyfiedHandler<TEvent, TResult, any, any>;
}

export type RouteNotFoundResponseFn = (input: {
	method: string;
	path: string;
}) => never;

declare function httpRouterHandler<
	TEvent extends
		| ALBEvent
		| APIGatewayProxyEvent
		| APIGatewayProxyEventV2 = APIGatewayProxyEvent,
	TResult extends
		| ALBResult
		| APIGatewayProxyResult
		| APIGatewayProxyResultV2 = APIGatewayProxyResult,
>(
	routes:
		| Array<Route<TEvent, TResult>>
		| {
				routes: Array<Route<TEvent, TResult>>;
				notFoundResponse: RouteNotFoundResponseFn;
		  },
): middy.MiddyfiedHandler<TEvent, TResult>;

export default httpRouterHandler;
