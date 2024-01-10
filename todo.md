### Client:

- Redo Front end entirely, use material ui?
- default cover image for reading list should be comic companion logo with different color options
- ~~Global modal where the content and visibility is all managed in Redux??~~
- Use loaders in react router instead of hooks for some api calls (getting comic info)??
- Extract api logic into its own custom hook? should store status that is either loading, error, or complete.
- Media query for issue page
- keep track of where the user is scrolled on the issue page? (might not be relevant if I do swiping left/right instead of scroll down)
- more descriptive errors for user auth
- rework components to have vertical/horizontal results components
- user auth should check if on modal or not

#### Styling Goals:

- Make header look better on home page
- Make the cards for popular comics/lists look better. (box shadows)

### API:

- Redo ComicExtra Helper (clean things up, get pagination data)
- Fix pagination
- Allow for picking server, (switch between xoxo and comicextra)
- functionality to update user info
- look into jwt expire date
- Replace RCO source (https://readcomicsonline.ru/)
- Rewrite tests
- Tags?
- Clean up helpers && Issue/Comic controllers
- Add some auth checking in create reading list
