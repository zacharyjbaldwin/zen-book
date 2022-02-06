# ZenBook
A pretty address book built on Node and MySQL.
This project is a work-in-progress. See a demo [here](https://zen-book.herokuapp.com).

Planned features:
* Add 'Generate vCard' button to view pages. This will generate a modal with a QR code for the contact.
* Add more fields to a contact.
* Implement search function.

## Testing
```
git clone https://www.github.com/zacharyjbaldwin/zen-book.git
cd zen-book
npm install
```
Before you can test it, you need to set up your database and create a file called `devkeys.json` which takes this format:

```json
{
    "mariadb": {
        "host": "my.hostname.com",
        "user": "root",
        "password": "my-db-password",
        "database": "zenbook"
    }
}
```
Then, on your SQL server, create a database called `zenbook`, and in `zenbook`, create a table called `people` with 

```sql
CREATE TABLE `people` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phonenumber` bigint(11) NOT NULL,
  `jobtitle` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL
);
```
This will change as more fields are added. But for now, you're all set.

Now you can do `npm test` in the root directory of the app to test it. By default, the server listens on port 3000. Navigate to [localhost:3000](localhost:3000) to see it.

## Technologies Used

Part | Technology
--- | ---
Frontend | Templates with Handlebars.js
Backend | Node.js with Express.js
Database | MariaDB


## License
MIT


