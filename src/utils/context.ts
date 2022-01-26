import { RequestContext } from "@type/requestContext";

const modifyContext = (
  ctx: RequestContext | undefined,
  newFeilds: RequestContext,
  replaceExisting: boolean = false
) => {
  if (replaceExisting) {
    return { ...ctx, ...newFeilds };
  }
  return { ...newFeilds, ...ctx };
};

export { modifyContext };
