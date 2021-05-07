import * as Query from "./q";
import * as Option from "fp-ts/Option";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";

pipe(
  Query.fetch(),
  E.map(r => pipe(
    Query.body(),
    Query.one(".list"),
    Option.map((l) => {
      r.forEach( ele => {
        Query.append(ele)(l)
      })
    })
  )),
  E.mapLeft(e => pipe(
    Query.body(),
    Query.one(".list"),
    Option.map((list) => {
      Query.append(pipe(Query.of(document.createElement("li")), Query.setInnerHtml(e.message)))(list)
    })
  ))
)

const html = (t: string): Option.Option<Query.Q> =>
  pipe(
    Query.body(),
    Query.one("#app"),
    Option.map((a) =>
      pipe(
        a,
        Query.setInnerHtml(`
          <div class="container">
            <h1>${t.toUpperCase()}</h1>
            <ul class="list"></ul>
          </div>
        `)
      )
    )
  );

html("Hello World");


