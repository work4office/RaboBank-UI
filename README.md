# rabobank-ui
# This is an assignment for read csv and display in UI using Angular.
Req: User can import any csv file and display those data in UI and user also can filter those data. 

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/rabobank-ui)

UI workflow:
1. User needs to select any csv file by clicking on "Import csv" button.
2. This will read csv and will display those data in a table in UI.
3. There will be search input field also at the right top.
4. User can search anything from that field and table will be filtered accordingly.

Code workflow:
Components relation: Parent(app.component) -> Child(home.component) -> Child(data.component)
1. Import csv from home.component and reading using FileReader.
2. Convert those string(read from FileReader) into Array of objects.
3. Passing that array of objects to data.component and rendering in html table.
4. Having a formControl binded in search field text box.
5. On valueChange in search box it will give an observable which will either filter the table body
   data or will return the entire table body data.
6. This observable is used in table body with async pipe, so it will take care of subscribe and unsubscribing of that.

