import { z } from "zod";

export default z
  .object({
    name: z.string().describe("The name of the Auth0 Application."),

    type: z
      .enum(["native", "spa", "webapp", "m2m"])
      .describe("The Auth0 Application Type to use when creating the new app."),

    description: z
      .string()
      .optional()
      .describe("The human-readable description of this application."),

    allowedCallbackUrls: z
      .array(z.string())
      .optional()
      .describe("An array of URLs that Auth0 will allow to be called back to upon proper auth."),

    allowedLogoutUrls: z
      .array(z.string())
      .optional()
      .describe("An array of URLs that Auth0 will allow to be called back to upon proper logout."),

    allowedWebOrigins: z
      .array(z.string())
      .optional()
      .describe("An array of origins to use when using cross origin auth."),

    allowCrossOriginAuth: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "When allowed, cross-origin authentication allows applications to make authentication " +
          "requests when the Lock widget or custom HTML is used.",
      ),
  })
  .describe("An application in Auth0");
