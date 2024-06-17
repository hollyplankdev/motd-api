import { z } from "zod";

export default z
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
