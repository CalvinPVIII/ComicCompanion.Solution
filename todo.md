### Client:

- Overall styling cleanup
- Adjust navmenu. Use form/formcontrol??
- Handle auth tokens (kind of done? security audit maybe)
- ~~Creating reading lists~~
- ~~Making searching comics feel more "reactive"~~
- hide .env
- ComicInfo loading styling (skeleton)
- ~~Number on currently editing reading list in top left~~
- Pagination
- Issue popup?
- ~~Link to issue from reading list~~
- Organize component files
- Add image for reading lists
- Update api responses to account for new structure

#### Would be nice:

- Extracting adding/deleting issue to currently edited reading list to reusable function
- Reusable modal component
- Look into updating APIResponseDTO to have a Type<T> implementation?

### API:

- Replace RCO source (https://xoxocomic.com/)
- Rewrite tests
- Popular comics endpoint
- Add number of pages (for the request pagination, not pages of the comic itself) info to comic endpoint
- ~~Serialize the Issues Array in the ReadingListModel to be strings~~
- ~~Method to check if reading list belongs to user making get request~~
- Clean up helpers && Issue/Comic controllers
- ~~Add user name to created reading list => if usernames can be updated this would need to be done dynamically~~
- Look into how usernames are getting stored in database, do they need to be unique, are the in the email field etc. Might want to use them for querying lists by a specific user.
- ~~Reading list pagination~~
- Functionality to update user name/email/password
- Upvote/downvote reading lists
- Tags?
