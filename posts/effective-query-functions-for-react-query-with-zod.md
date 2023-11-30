---
tags: post
layout: post.liquid
title: "Effective Query Functions for React Query with Zod"
date: "2022-03-03"
---

Lately, I have been experimenting with [React Query](https://react-query.tanstack.com/) for data synchronization with React, and I find it excellent.

Take a look at a basic example:

```tsx
function Example() {
  const { data } = useQuery("repositoryData", () => getRepository());

  return <div>The name is {data?.name}</div>;
}
```

I want to show you not this but the way I define the `getRepository` query function.

Here is its definition:

```ts
const GetRepositoryRequest = z.void();
const GetRepositoryResponse = z.object({ name: z.string().min(1) });
export const getRepository = api<
  z.infer<typeof GetRepositoryRequest>,
  z.infer<typeof GetRepositoryResponse>
>({
  method: HTTPMethod.GET,
  path: "/repository",
  requestSchema: GetRepositoryRequest,
  responseSchema: GetRepositoryResponse,
});
```

Yes, it looks complex at first, but it really isn't.

First, we are using [Zod](https://zod.js.org/) to define the request and response schemas. We will use these to validate the data that we're sending to and from the API. Why this, you ask? Simply because we have no guarantee on what data the API will return, and it's good to validate it before we use it.

After request and response are defined, we create the query function. I'm using an `api` function that I will explain later. The `api` method is typed with a [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html) that accepts two arguments: the type of the request and the type of the response. Here we're using Zod's [type inference](https://github.com/colinhacks/zod#type-inference), so we don't have to duplicate the type definition. We're getting both runtime validation and TypeScript type checking at the price of one.

The rest is self-explanatory. We're passing the method using the HTTPMethod enum, the path and the request and response schemas defined before.

Ok, so what does the `api` method look like? Something like this:

```ts
import axios from "axios";
import env, { isProduction, EnvName } from "utils/env";
import type { z } from "zod";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

export enum HTTPStatusCode {
  OK = 200,
}

export default function api<Request, Response>({
  method,
  path,
  requestSchema,
  responseSchema,
}: {
  method: HTTPMethod;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
}): (data: Request) => Promise<Response> {
  return function (requestData: Request) {
    requestSchema.parse(requestData);

    async function apiCall() {
      const response = await axios({
        baseURL: process.env.API_URL,
        method,
        url: path,
        [method === HTTPMethod.GET ? "params" : "data"]: requestData,
      });

      if (process.env.NODE_ENV === EnvName.PRODUCTION) {
        responseSchema.safeParseAsync(response.data).then((result) => {
          if (!result.success) {
            // TODO: Send error to sentry or other error reporting service
          }
        });

        return response.data as Response;
      }

      return responseSchema.parse(response.data);
    }

    return apiCall();
  };
}
```

As you can see, `api` validates both your request and response data and makes the call to the API.

The validation of the response happens asynchronously in production but synchronously in development. This is because we don't want to block the UI while we're validating the data.

---

I have been using this approach for a while now, and it works really well for me. The added bonus is that all my queries are defined in one place, and I can read them to know what my API looks like. Plus, I can spot breaking changes in the backend and quickly fix them.
