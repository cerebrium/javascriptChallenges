/* eslint-disable no-redeclare, no-undef */

import { makeBy } from "fp-ts/lib/Array";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";

const wrapArr = <A>(a: A | A[]): A[] => (Array.isArray(a) ? a : [a]);

export type Q<El extends HTMLElement = HTMLElement> = {
  _tag: "Q";
  el: El;
};

/**
 * Wrap a DOM element into a {@linkcode Q}
 * @typeparam E The type of DOM element being wrapped
 * @param element The DOM element being wrapped
 * @param prev The element queried for previous to this element
 */
export const of = <El extends HTMLElement = HTMLElement>(element: El): Q<El> => {
  return { _tag: "Q", el: element };
};

/**
 * @returns The wrapped document body
 */
export const body = (): Q<HTMLBodyElement> => {
  return of(document.body as HTMLBodyElement);
};

/**
 * Query for a single element matching a given selector within the current element
 * @typeparam El The type of DOM element being queried for
 * @returns The wrapped element, if found, otherwise none
 */
export function one<K extends keyof HTMLElementTagNameMap>(
  selector: K
): <El extends HTMLElement = HTMLElement>(q: Q<El>) => O.Option<Q<HTMLElementTagNameMap[K]>>;
export function one<El_ extends HTMLElement = HTMLElement>(
  selector: string
): <El extends HTMLElement = HTMLElement>(q: Q<El>) => O.Option<Q<El_>>;
export function one<El_ extends HTMLElement = HTMLElement>(
  selector: string
): <El extends HTMLElement = HTMLElement>(q: Q<El>) => O.Option<Q<El_>> {
  return <El extends HTMLElement = HTMLElement>(q: Q<El>) =>
    pipe(q.el.querySelector<El_>(selector), O.fromNullable, O.map(of));
}

/**
 * Query for all elements matching a given selector within the current element
 * @typeparam El The type of DOM element being queried for
 * @returns An array of wrapped elements
 */
export function all<K extends keyof HTMLElementTagNameMap>(
  selector: K
): <El extends HTMLElement = HTMLElement>(q: Q<El>) => Q<HTMLElementTagNameMap[K]>[];
export function all<El_ extends HTMLElement = HTMLElement>(
  selector: string
): <El extends HTMLElement = HTMLElement>(q: Q<El>) => Q<El_>[];
export function all<El_ extends HTMLElement = HTMLElement>(
  selector: string
): <El extends HTMLElement = HTMLElement>(q: Q<El>) => Q<El_>[] {
  return <El extends HTMLElement = HTMLElement>(q: Q<El>) =>
    [].slice.call(q.el.querySelectorAll<El_>(selector)).map((s) => of<El_>(s));
}

/**
 * Add classes to the current element
 */
export const addClass = (klasses: string | string[]) => <El extends HTMLElement = HTMLElement>(q: Q<El>): Q<El> => {
  wrapArr(klasses).forEach((c: string) => q.el.classList.add(c));
  return q;
};

/**
 * Remove classes from the current element
 */
export const removeClass = (klasses: string | string[]) => <El extends HTMLElement = HTMLElement>(q: Q<El>): Q<El> => {
  wrapArr(klasses).forEach((c: string) => q.el.classList.remove(c));
  return q;
};

/**
 * Get the inner HTML of the current element
 */
export const getInnerHtml = <El extends HTMLElement = HTMLElement>(q: Q<El>): string => {
  return q.el.innerHTML;
};

/**
 * Get the inner HTML of the current element
 */
export const getOuterHtml = <El extends HTMLElement = HTMLElement>(q: Q<El>): string => {
  return q.el.outerHTML;
};

/**
 * Set the inner HTML of the current element
 */
export const setInnerHtml = (html: string) => <El extends HTMLElement = HTMLElement>(q: Q<El>): Q<El> => {
  q.el.innerHTML = html;
  return q;
};

/**
 * Set the outer HTML of the current element
 */
export const setOuterHtml = (html: string) => <El extends HTMLElement = HTMLElement>(q: Q<El>): Q<El> => {
  q.el.outerHTML = html;
  return q;
};

/**
 * Append a given element as a child to the current element
 */
export const append = (other: Q) => <El extends HTMLElement = HTMLElement>(q: Q<El>): Q<El> => {
  q.el.insertAdjacentElement("beforeend", other.el);
  return q;
};

/**
 * Mocks an AJAX Fetch
 */
export const fetch = (): E.Either<Error, Q[]> => {
  return [
    E.right<Error, Q[]>(makeBy(5, (i) => pipe(of(document.createElement("li")), setInnerHtml(`Item ${i}`)))),
    E.left<Error, Q[]>(new Error("Ajax fetch failed"))
  ][Math.round(Math.random())];
};
