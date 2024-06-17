import { z } from "zod";

export const Auth0TenantModel = z
  .object({
    name: z.string().describe("The name of the Auth0 tenant."),

    url: z.string().describe("The URL to use as the subdomain of the Auth0 tenant."),
  })
  .describe("A Tenant in Auth0");

export const Auth0ApplicationModel = z
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

export const Auth0ApiModel = z
  .object({
    name: z
      .string()
      .describe("Friendly name for the API. The following characters are not allowed < > "),

    identifier: z
      .string()
      .describe(
        "Unique identifier for the API. This value will be used as the `audience` parameter on " +
          "authorization calls. Identifier cannot be changed later.",
      ),

    jwtSigningAlgorithm: z
      .enum(["RS256", "HS256"])
      .optional()
      .default("RS256")
      .describe("Algorithm used to sign `access tokens` issued for this API."),

    rbac: z
      .object({
        enable: z
          .boolean()
          .describe(
            "If this setting is enabled, RBAC authorization policies will be enforced for " +
              "this API. Role and permission assignments will be evaluated during the login " +
              "transaction.",
          ),

        addPermisionsToToken: z
          .boolean()
          .describe(
            "If this setting is enabled, the Permissions claim will be added to the access " +
              "token. Only available if RBAC is enabled for this API.",
          ),
      })
      .optional()
      .describe("Role-base access control settings."),

    permissions: z
      .map(
        z.string().describe("Permission string (something like `appointments:read`)."),

        z.string().describe("Permission description."),
      )
      .describe("Permissions (scopes) that this API uses."),
  })
  .describe("An API in Auth0.");

export const Auth0FormationConfigModel = z
  .object({
    tenant: Auth0TenantModel,

    applications: z
      .array(Auth0ApplicationModel)
      .describe("Applications that exist within this tenant."),

    apis: z.array(Auth0ApiModel).describe("APIs that exist within this tenant."),
  })
  .describe("Configuration of an Auth0 Tenant's formation.");
