import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const {GET,POST} = createRouteHandler({
    router:ourFileRouter,
    //exposing the router so that it can be used wherever needed 
});