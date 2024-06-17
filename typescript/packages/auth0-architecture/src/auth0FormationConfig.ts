import { z } from "zod";

export const Auth0TenantModel = z.object({
  /** The name of the Auth0 tenant. */
  name: z.string(),

  /** The URL to use as the subdomain of the Auth0 tenant. */
  url: z.string(),
});

export const Auth0ApplicationModel = z.object({
  /** The name of the Auth0 Application. */
  name: z.string(),

  /** The Auth0 Application Type to use when creating the new app. */
  type: z.enum(["native", "spa", "webapp", "m2m"]),

  /** The human-readable description of this application. */
  description: z.string().optional(),

  /** An array of URLs that Auth0 will allow to be called back to upon proper auth. */
  allowedCallbackUrls: z.array(z.string()).optional(),

  /** An array of URLs that Auth0 will allow to be called back to upon proper logout. */
  allowedLogoutUrls: z.array(z.string()).optional(),

  /** An array of origins to use when using cross origin auth. */
  allowedWebOrigins: z.array(z.string()).optional(),

  /**
   * When allowed, cross-origin authentication allows applications to make authentication requests
   * when the Lock widget or custom HTML is used.
   */
  allowCrossOriginAuth: z.boolean().optional().default(false),
});

export const Auth0ApiModel = z.object({});

export const Auth0FormationConfigModel = z.object({
  tenant: Auth0TenantModel,
  applications: z.array(Auth0ApplicationModel),
  apis: z.array(Auth0ApiModel),
});
