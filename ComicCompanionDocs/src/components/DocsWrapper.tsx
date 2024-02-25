import "../styles/DocsWrapper.css";
import {
  comicIdEndpoint,
  getIssueEndpoint,
  popularComicsEndpoint,
  popularReadingListEndpoint,
  readingListGetEndpoint,
  readingListIdEndpoint,
  searchComicEndpoint,
} from "../ts/endpointInfo";
import Endpoint from "./Endpoint";

const readingListEndpoints = [readingListGetEndpoint, readingListIdEndpoint, popularReadingListEndpoint];

const comicEndpoints = [searchComicEndpoint, comicIdEndpoint, popularComicsEndpoint];

const issueEndpoints = [getIssueEndpoint];

export default function DocsWrapper() {
  return (
    <>
      <h1 id="docs-header">Comic Companion</h1>
      <h2 id="api-header">API Documentation</h2>
      <Endpoint name="Reading Lists" endpoints={readingListEndpoints} />
      <Endpoint name="Comics" endpoints={comicEndpoints} />
      <Endpoint name="Issues" endpoints={issueEndpoints} />
    </>
  );
}
