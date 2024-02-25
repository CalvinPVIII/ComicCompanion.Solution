import { EndpointInfo } from "../types";
import {
  comicIdResponse,
  exampleReadingListRequest,
  issueResponse,
  popularComicResponse,
  popularReadingListResponse,
  readingListIdResponse,
  searchComicsResponse,
} from "./exampleData";

export const readingListGetEndpoint: EndpointInfo = {
  urlEndpoint: "/ReadingLists",
  description: "Returns all Reading Lists",
  requestType: "get",
  pagination: true,
  responseExample: JSON.stringify(exampleReadingListRequest, null, 2),
  queryParams: [
    { displayName: "List Name", urlParam: "listName", queryType: "text" },
    { displayName: "Page Number", urlParam: "page", queryType: "number" },
  ],
};

export const readingListIdEndpoint: EndpointInfo = {
  urlEndpoint: "/ReadingLists/{id}",
  description: "Returns one reading list that matches the given ID",
  requestType: "get",
  pagination: false,
  responseExample: JSON.stringify(readingListIdResponse, null, 2),
};

export const popularReadingListEndpoint: EndpointInfo = {
  urlEndpoint: "/ReadingLists/popular",
  description: "Returns list of Reading Lists, ordered highest to lowest by rating",
  requestType: "get",
  pagination: false,
  responseExample: JSON.stringify(popularReadingListResponse, null, 2),
};

export const searchComicEndpoint: EndpointInfo = {
  urlEndpoint: "/api/Comics/search",
  description: "Returns a list of Comics based on search query",
  requestType: "get",
  pagination: true,
  queryParams: [
    { displayName: "Keyword", urlParam: "keyword", queryType: "text" },
    { displayName: "Page Number", urlParam: "page", queryType: "number" },
  ],
  responseExample: JSON.stringify(searchComicsResponse, null, 2),
};

export const comicIdEndpoint: EndpointInfo = {
  urlEndpoint: "/api/Comics/{id}",
  description: "Returns Comic info that matches the given ID",
  requestType: "get",
  pagination: false,
  responseExample: JSON.stringify(comicIdResponse, null, 2),
};

export const popularComicsEndpoint: EndpointInfo = {
  urlEndpoint: "/api/Comics/popular",
  description: "Returns list of popular Comics",
  requestType: "get",
  pagination: true,
  queryParams: [{ displayName: "Page Number", urlParam: "page", queryType: "number" }],
  responseExample: JSON.stringify(popularComicResponse, null, 2),
};

export const getIssueEndpoint: EndpointInfo = {
  urlEndpoint: "/api/Comics/{comicId}/issues/{issueId}",
  description: "Returns information for given Issue and Comic ID",
  requestType: "get",
  pagination: true,
  queryParams: [{ displayName: "Page Number", urlParam: "page", queryType: "number" }],
  responseExample: JSON.stringify(issueResponse, null, 2),
};
