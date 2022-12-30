import { ZettelServices } from "@zettelproject/api-server";
import { ZETTEL_SERVICES_EXTENSION_REST_OPTIONS } from "./constants";

export const zettelExtensionRestService = new ZettelServices.Extension.Rest(
  ZETTEL_SERVICES_EXTENSION_REST_OPTIONS
);
