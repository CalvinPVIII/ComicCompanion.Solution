### Client:

- Redo Front end entirely, use material ui?
- default cover image for reading list should be comic companion logo with different color options

### API:

- Replace RCO source (https://xoxocomic.com/, https://readcomicsonline.ru/)
- Rewrite tests
- ~~Popular comics endpoint~~
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
