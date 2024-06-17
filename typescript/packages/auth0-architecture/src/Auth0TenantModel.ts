import { z } from "zod";
import Auth0ApplicationModel from "./Auth0ApplicationModel";
import Auth0ApiModel from "./Auth0ApiModel";

export default z
  .object({
    name: z.string().describe("The name of the Auth0 tenant."),
    url: z.string().describe("The URL to use as the subdomain of the Auth0 tenant."),

    applications: z
      .array(Auth0ApplicationModel)
      .describe("Applications that exist within this tenant."),

    apis: z.array(Auth0ApiModel).describe("APIs that exist within this tenant."),
  })
  .describe("A Tenant in Auth0");
